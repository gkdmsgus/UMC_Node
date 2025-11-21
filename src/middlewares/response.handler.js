export const responseHandler = (req, res, next) => {
    /**
     * 성공 응답 헬퍼
     * @param {Object} data - 응답 데이터
     */
    res.success = (data) => {
      return res.json({
        resultType: "SUCCESS",
        error: null,
        success: data
      });
    };
  
    /**
     * 에러 응답 헬퍼
     * @param {String} errorCode - 에러 코드
     * @param {String} reason - 에러 사유
     * @param {Object} data - 추가 데이터
     */
    res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
      return res.json({
        resultType: "FAIL",
        error: { errorCode, reason, data },
        success: null
      });
    };
  
    next();
  };