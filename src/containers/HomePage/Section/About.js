import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về Booking Care
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/nOh7h67IxJs"
                            title="Hướng Dẫn Đặt Lịch Khám Qua BookingCare"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div className="content-right">
                        <p>
                            BookingCare là nền tảng đặt lịch khám bệnh đầu tiên
                            tại Việt Nam có định hướng kết nối bệnh nhân, bác
                            sĩ, và cơ sở y tế; hỗ trợ đặt lịch khám miễn phí.
                            ĐÚNG BỆNH NHÂN, ĐÚNG BÁC SĨ Đặt lịch khám với
                            BookingCare qua: - Website: https://bookingcare.vn -
                            Hotline hỗ trợ : 024-7301-2468
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
