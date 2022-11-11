import '../style/tutor.scss';
import { Container, Row, Col } from 'react-grid';
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import React from "react";

import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import GlobalConfig from '../config';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class TutorDanceClass extends React.Component {

    state = {
        tutorName: "Bumz",
        tutorFullName: "",
        tutorId: 1,
        classId: 0,
        className: "",
        modalShow: false,
        pickedDate: new Date(),
        classList: [],
        attendanceDates: [],
        baseUrl: GlobalConfig.apiUrl + '/attendance/',
        loaded: false
    }

    loadData = () => {
        let tutorUrl = GlobalConfig.apiUrl + '/tutor/' + localStorage.getItem('tutorId');

        axios.get(tutorUrl)
            .then((res) => {
                this.setState({
                    tutorId: res.data.id,
                    tutorName: res.data.nickname,
                    tutorFullName: res.data.fullName,
                    classList: res.data.classList,
                    classId: res.data.classList[0].id,
                    className: res.data.classList[0].className
                })

                this.loadAttendance(res.data.id, res.data.classList[0].id)
            })


    }

    loadAttendance = (tutorId, classId) => {
        axios.get(this.state.baseUrl + tutorId + '/' + classId)
            .then((res) => {
                this.setState({
                    attendanceDates: res.data.dates
                })
            })
    }

    deleteDate = (date) => {
        let url = this.state.baseUrl + this.state.tutorId + '/'
            + this.state.classId + '/' + date;

        axios.delete(url)
            .then((res) => {
                this.setState({
                    attendanceDates: res.data.dates
                })
            }).catch(console.log);
    }

    setPickedDate = (date) => {
        this.setState({
            pickedDate: date
        })
    }

    getFormattedDateStr = () => {
        return this.state.pickedDate.toISOString().substring(0, 10)
    }

    postAddDate = () => {
        if (this.state.attendanceDates.includes(this.getFormattedDateStr())) {
            return;
        }

        let body = {
            "tutorId": this.state.tutorId,
            "danceClassId": this.state.classId,
            "dateToProcess": this.getFormattedDateStr()
        }
        axios.post(
            this.state.baseUrl,
            body
        )
            .then((res) => {
                this.setState({
                    attendanceDates: res.data.dates
                })
            })
            .catch(console.log);
    }

    handleSelect = (e) => {
        if (!this.state.loaded) {
            return;
        }

        let classObj = this.state.classList[e]
        this.setState({
            classId: classObj.id,
            className: classObj.className
        })

        this.loadAttendance(this.state.tutorId, classObj.id);
    }

    render() {
        if (!this.state.loaded) {
            this.loadData();
            this.setState({
                loaded: true
            })
        }
        return <div className='class-container'>
            <div className="class-header">
                {/* <h1>{this.state.className}</h1> */}
                <h1>{this.state.tutorName}</h1>
            </div>

            <Container className='class-info'>
                <Row>
                    {/* ------ Thông tin giáo viên ------ */}
                    <Col>
                        <DropdownButton
                            title={this.state.className}
                            id="dropdown-menu-align-right"
                            onSelect={this.handleSelect}
                            variant="secondary"
                        >
                            {this.state.classList.map((cl, i) => {
                                return <Dropdown.Item
                                    key={i}
                                    eventKey={i}>{cl.className}
                                </Dropdown.Item>;
                            })}
                        </DropdownButton>
                        <h2>Điểm danh</h2>

                        <div>
                            <p>Số buổi: {this.state.attendanceDates.length}</p>
                        </div>

                        <div className='date-picker-container'>
                            <span className="date-picker">
                                <DatePicker
                                    selected={this.state.pickedDate}
                                    onChange={(date) => this.setPickedDate(date)}
                                    dateFormat="dd/MM/yyyy" />
                            </span>
                            <span>
                                <Button variant='success' onClick={() => this.postAddDate()}>Thêm ngày</Button>
                            </span>
                        </div>
                    </Col>

                    {/* ------ Thông tin chung ------ */}
                    <Col className="attendance-list">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ngày</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.attendanceDates.map((date, i) => {
                                    return <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{date}</td>
                                        <td><Button variant="danger" onClick={() => this.deleteDate(date)}>Xoá</Button></td>
                                    </tr>;
                                })}
                            </tbody>

                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>;
    }

}

export default TutorDanceClass;