import '../style/management.scss';
import React from 'react';
import { Container, Row, Col } from 'react-grid';
class Management extends React.Component {

    state = {
        totalStudents: 25,
        totalExpense: 10000000,
        totalSalary: 7000000,
        totalAds: 1000000,
        totalHousing: 6000000,
        totalOther: 0,
        totalIncome: 0,
        totalTuitionFee: 0,
        totalRentalFee: 0,
        salaryBumz: 3500000,
        salaryBoAh: 3500000,
        countBumz: 15,
        countBoAh: 8,
    }

    render() {
        return <div >
            <
            img className = 'timeline'
        src = { require("../asset/images/schedule.jpg") }
        alt = "Schedule" / >

            <
            Container className = 'info-container' >
            <
            Row > { /* ------ Thông tin chung ------ */ } <
            Col >
            <
            h2 > Thông tin chung < /h2> <
        div className = 'info-details' >
            <
            div className = 'info-block' >
            <
            h3 > Tổng số học viên: { this.state.totalStudents } < /h3> < /
            div > <
            div className = 'info-block' >
            <
            h3 > Chi phí: { this.state.totalExpense } < /h3> <
        div className = "expenses-details" >
            <
            p > Trả lương: { this.state.totalSalary } < /p> <
        p > Quảng cáo: { this.state.totalAds } < /p> <
        p > Thuê nhà: { this.state.totalHousing } < /p> <
        p > Khác: { this.state.totalOther } < /p> < /
            div > <
            /div>

        <
        div className = 'info-block' >
            <
            h3 > Thu nhập tháng này: { this.state.totalIncome } < /h3> <
        div className = "expenses-details" >
            <
            p > Học phí: { this.state.totalTuitionFee } < /p> <
        p > Thuê phòng: { this.state.totalRentalFee } < /p> < /
            div > <
            /div> < /
            div > <
            /Col>

        { /* ------ Thông tin giáo viên ------ */ } <
        Col >
            <
            h2 > Thông tin giáo viên < /h2> <
        div className = 'info-details' >
            <
            div className = 'info-block' >
            <
            h3 > Bumz < /h3> <
        div className = "expenses-details" >
            <
            p > Số buổi: { this.state.countBumz } < /p> <
        p > Lương: { this.state.salaryBumz } < /p> <
        div className = "tutor-class-list" >
            Lớp:
            <
            /div> < /
            div > <
            /div>

        <
        div className = 'info-block' >
            <
            h3 > Jung Bo Ah < /h3> <
        div className = "expenses-details" >
            <
            p > Số buổi: { this.state.countBoAh } < /p> <
        p > Lương: { this.state.salaryBoAh } < /p> <
        div className = "tutor-class-list" >
            Lớp:
            <
            /div> < /
            div > <
            /div> < /
            div > <
            /Col> < /
            Row > <
            /Container> < /
            div > ;
    }

}

export default Management;