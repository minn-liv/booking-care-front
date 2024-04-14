import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
import "./ManageBooking.scss";
import { getAllBooking } from "../../../services/userService";
import moment from "moment";

class ManageBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    async componentDidMount() {
        this.getDataBooking();
    }

    getDataBooking = async () => {
        let res = await getAllBooking();
        console.log(res);
        if (res && res.errCode === 0) {
            this.setState({
                data: res.data,
            });
        }
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    render() {
        return (
            <div className="manage-booking-container container mt-5">
                <h2 className="title">Danh sách đặt lịch khám bệnh</h2>

                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Bác sĩ khám</th>
                            <th>Bệnh nhân</th>
                            <th>Giới tính</th>
                            <th>Email</th>
                            <th>Khung giờ</th>
                            <th>Ngày đặt</th>
                            <th>Trạng thái</th>
                        </tr>
                        {this.state.data &&
                            this.state.data.length > 0 &&
                            this.state.data.map((item, index) => {
                                let status, gender;
                                let date = moment(Number(item.date)).format(
                                    "DD/MM/YYYY"
                                );

                                if (item.statusId === "S1") {
                                    status = "Lịch hẹn mới";
                                } else if (item.statusId === "S2") {
                                    status = "Đã xác nhận";
                                } else if (item.statusId === "S3") {
                                    status = "Đã khám xong";
                                }

                                if (item.patientData.gender === "M") {
                                    gender = "Nam";
                                } else if (item.patientData.gender === "F") {
                                    gender = "Nữ";
                                } else if (item.patientData.gender === "O") {
                                    gender = "Khác";
                                }
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>
                                            {item.doctorDataList.lastName +
                                                item.doctorDataList.firstName}
                                        </td>
                                        <td>
                                            {item.patientData
                                                ? item.patientData.firstName
                                                : ""}
                                        </td>
                                        <td>{gender}</td>
                                        <td>
                                            {item.patientData
                                                ? item.patientData.email
                                                : ""}
                                        </td>
                                        <td>
                                            {item.timeTypeDataPatient.valueVi}
                                        </td>
                                        <td>{date}</td>
                                        <td>{status}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
