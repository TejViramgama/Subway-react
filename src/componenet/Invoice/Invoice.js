import { Fragment } from "react";
import "./Invoice.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Invoice = (props) => {
  let totalRegularPay,
    totalOvertimePay,
    tip,
    finalTotal,
    deductionAmount,fredWH = 0.0;
  const taxDeductionPer = 0.0765;

  const calculateData = () => {
    totalRegularPay = props.workingHrs * props.perHrRate;
    totalOvertimePay = props.workingOTHrs * props.perHrOTRate;
    tip = props.tip * 1;
    fredWH = props.fredWH * 1;
    deductionAmount =
      (totalOvertimePay + totalRegularPay + tip) * taxDeductionPer;

    finalTotal = totalOvertimePay + totalRegularPay + tip - deductionAmount - fredWH;
  };

  const convertToPdf = () => {
    console.log("inside PRINT");

    const input = document.getElementById("targetTable");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 25, 25);
      pdf.save(((props.username).replace(/ /g,"_"))+"_PaySlip.pdf");
    });
  };

  calculateData();
  return (
    <Fragment>
      <div>
        <table id="targetTable" className="body-wrap">
          <tbody>
            <tr>
              <td></td>
              <td className="container" width="600">
                <div className="content">
                  <table
                    className="main"
                    width="100%"
                    cellPadding="0"
                    cellSpacing="0"
                  >
                    <tbody>
                      <tr>
                        <td className="content-wrap aligncenter">
                          <table width="100%" cellPadding="0" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td className="content-block">
                                  <h2>{props.username}</h2>
                                </td>
                              </tr>
                              <tr>
                                <td className="content-block">
                                  <table className="invoice">
                                    <tbody>
                                      <tr>
                                        <td><b>Check #{props.checkNo}</b></td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table
                                            className="invoice-items"
                                            cellPadding="0"
                                            cellSpacing="0"
                                          >
                                            <tbody>
                                              <tr>
                                                <td>
                                                  Total Regular (
                                                  {props.workingHrs} hr x{" "}
                                                  {props.perHrRate} $)
                                                </td>
                                                <td className="alignright">
                                                  $ {totalRegularPay.toFixed(2)}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  Total Overtime (
                                                  {props.workingOTHrs} hr x{" "}
                                                  {props.perHrOTRate} $)
                                                </td>
                                                <td className="alignright">
                                                  ${" "}
                                                  {totalOvertimePay.toFixed(2)}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Tip</td>
                                                <td className="alignright">
                                                  $ {tip.toFixed(2)}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Tax Deduction</td>
                                                <td className="alignright">
                                                  - ${" "}
                                                  {deductionAmount.toFixed(2)}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Fredral With Holding</td>
                                                <td className="alignright">
                                                  - ${" "}
                                                  {fredWH.toFixed(2)}
                                                </td>
                                              </tr>
                                              <tr className="total">
                                                <td
                                                  className="alignright"
                                                  width="80%"
                                                >
                                                  Total
                                                </td>
                                                <td className="alignright">
                                                  $ {finalTotal.toFixed(2)}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td className="content-block">
                                  {/* <a href="#">View in browser</a> */}
                                </td>
                              </tr>
                              <tr>
                                <td className="content-block">
                                  Company Inc. 123 Van Ness, San Francisco 94102
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="footer">
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td className="aligncenter content-block">
                            Questions? Email{" "}
                            <a href="mailto:">support@company.inc</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button className="action-buttons" onClick={convertToPdf}>Download</button>
        <button className="action-buttons" onClick={props.changeIsSubmited}>Modify Info</button>
        <button className="action-buttons" onClick={() => window.location.reload(false)} >Create New</button>
      </div>
    </Fragment>
  );
};

export default Invoice;
