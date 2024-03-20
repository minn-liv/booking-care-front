import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import moment from "moment";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import { postBookAppointment } from "../../../../services/userService";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            address: "",
            reason: "",
            birthday: "",
            doctorId: "",
            selectedGender: "",
            genders: "",
            timeType: "",
            isShowLoading: false,
        };
    }
    i;
    async componentDidMount() {
        this.props.getGender();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label =
                    language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time =
                language === LANGUAGES.VI
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;
            let date =
                language === LANGUAGES.VI
                    ? moment
                          .unix(+dataTime.date / 1000)
                          .format("dddd - DD/MM/YYYY")
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale("en")
                          .format("ddd - DD/MM/YYYY");
            return `${time} - ${date}`;
        }
    };
    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === LANGUAGES.VI
                    ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                    : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

            return name;
        }
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                });
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({ birthday: date[0] });
    };

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    };

    handleConfirmBooking = async () => {
        this.setState({
            isShowLoading: true,
        });
        // validate input
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
            selectedGender: this.state.selectedGender.value,
        });
        this.setState({
            isShowLoading: false,
        });
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment succeed!");
            this.props.closeBookingClose();
        } else {
            toast.error("Booking a new appointment error!");
        }
    };

    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let doctorId = "";
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }

        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text="Loading..."
            >
                <Modal
                    isOpen={isOpenModal}
                    className={"booking-modal-container"}
                    size="lg"
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">
                                <FormattedMessage id="patient.booking-modal.title" />
                            </span>
                            <span className="right" onClick={closeBookingClose}>
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            {/* {JSON.stringify(dataTime)} */}
                            <div className="doctor-infor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={true}
                                    isShowPrice={false}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>
                                        {" "}
                                        <FormattedMessage id="patient.booking-modal.fullName" />
                                    </label>
                                    <input
                                        value={this.state.fullName}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "fullName"
                                            )
                                        }
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                    </label>
                                    <input
                                        value={this.state.phoneNumber}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "phoneNumber"
                                            )
                                        }
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.email" />
                                    </label>
                                    <input
                                        value={this.state.email}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "email"
                                            )
                                        }
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <input
                                        value={this.state.address}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "address"
                                            )
                                        }
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.reason" />
                                    </label>
                                    <input
                                        value={this.state.reason}
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "reason"
                                            )
                                        }
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.birthday" />
                                    </label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthday}
                                        // minDate={yesterday}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        {" "}
                                        <FormattedMessage id="patient.booking-modal.gender" />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button
                                className="btn-booking-confirm"
                                onClick={() => this.handleConfirmBooking()}
                            >
                                <FormattedMessage id="patient.booking-modal.btnConfirm" />
                            </button>
                            <button
                                className="btn-booking-cancel"
                                onClick={closeBookingClose}
                            >
                                <FormattedMessage id="patient.booking-modal.btnCancel" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (state) => {
    return { language: state.app.language, genders: state.admin.genders };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
