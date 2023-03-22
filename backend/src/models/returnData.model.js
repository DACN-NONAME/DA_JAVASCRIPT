class ReturnData {
  constructor() {
    this.success = false;
    // this.defaultMessage = "Có lỗi xảy ra, vui lòng thử lại sau!";
    this.message = this.defaultMessage();
    this.data;
  }
  defaultMessage() {
    return "Có lỗi xảy ra, vui lòng thử lại sau!";
  }
  toObject() {
    if (this.success == true && this.message == this.defaultMessage())
      return {
        success: true,
        data: this.data,
      };
    else if (this.success == true && this.message != this.defaultMessage())
      return {
        success: true,
        message: this.message,
        data: this.data,
      };
    else
      return {
        success: false,
        message: this.message,
        data: this.data,
      };
  }
}

module.exports = ReturnData;
