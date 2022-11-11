import React from 'react';
import '../style/class.scss'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import TuitionFeeHistory from '../component/TuitionFeeHistory';
import { Button } from "react-bootstrap";
import GlobalConfig from '../config';
import axios from 'axios';

class Class extends React.Component {

  state = {
    className: "SEXY DANCE",
    tutorName: "Jung Bo Ah",
    classId: 1,
    modalShow: false,
    studentList: [],
    loaded: false
  }

  loadData = () => {
    let url = GlobalConfig.apiUrl + '/class/' + this.state.classId;

    axios.get(url)
      .then((res) => {
        this.setState({
          className: res.data.className,
          tutorName: res.data.tutor.nickname,
          studentList: res.data.studentList
        })

      })


  }

  setModalShow(val) {
    this.setState({
      modalShow: val
    })
  }

  showModal = (stuId) => {
    this.setModalShow(true);
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
        <h1>{this.state.className}</h1>
        <h3>{this.state.tutorName}</h3>
      </div>

      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Biệt danh</th>
            <th>Năm sinh</th>
            <th>SĐT</th>
            <th>Phụ huynh</th>
            <th>Số buổi</th>
            <th>Lịch sử học phí</th>
          </tr>
        </thead>
        <tbody>
          {this.state.studentList.map((stu, i) => {
            return <tr key={i}>
              <td>{i + 1}</td>
              <td>{stu.fullName}</td>
              <td>{stu.nickname}</td>
              <td>{stu.dateOfBirth}</td>
              <td>{stu.phoneNumber}</td>
              <td>{stu.parentName}</td>
              <td>{stu.attendanceCount}</td>
              <td><Button variant="primary" onClick={() => this.showModal(stu.id)}>History</Button></td>
            </tr>
          })}

        </tbody>
      </Table>

      <TuitionFeeHistory
        show={this.state.modalShow}
        onHide={() => this.setModalShow(false)}
      />
    </div>;
  }
}


export default Class;