import { Button, Form, Input, Select, Switch, Card } from "antd";
import { useState } from "react";
import Results from "./Results";
interface FormValues {
  salary: string;
  worked_Days: string;
  bonus:string;
  extra_hours:string
  "serviceTime"?: number;
  "workedMonth"?: string;
}
function CalculatorForm() {
//useState for Switches, Select and Calculation Logic
  const [includeVacaciones, setIncludeVacaciones] = useState(false);
  const [includeNavidadBonus, setIncludeNavidadBonus] = useState(false);
  const [includePreAviso, setIncludePreAviso] = useState(false);
  //TOTAL OF LIQUIDATION OR LAST PAYCHECK
  const [totalLiquidation, setTotalLiquidation] = useState("");

  const [form] = Form.useForm(); // To get form values


  const Calculate = (values:FormValues) => { //
    //Retrieving the salary, workedDays before December, 
    // Yeard of Serivce, Worked Days of the last from the Form   
    const salary = Number(values.salary);
    const worked_Days = Number(values.worked_Days);
    const serviceTime = Number(values["serviceTime"]) || 0;
    const workedMonthsBeforeDec = Number(values["workedMonth"]) || 0
    const bonus = Number(values.bonus)
    const extra_hours = Number(values.extra_hours)
    let total:number = 0;
      //Calculating bonus
if(bonus!=0){
 total+= salary*bonus/100
}
if(extra_hours!=0){
  total+= salary*bonus/100
 }
    // Calculating Preaviso if its checked
    if (!includePreAviso) {
      let preavisoDays:number = 0;
      if (worked_Days >= 90 && worked_Days < 180) preavisoDays = 6;
      else if (worked_Days >= 180 && worked_Days < 365) preavisoDays = 13;
      else if (worked_Days >= 365) preavisoDays = 28;
      total += (salary / 30) * preavisoDays;
    }

    // Calculate Vacations if its checked
    if (includeVacaciones) {
    
      total += (salary / 30) * serviceTime;
    }

    // Calculate Christmas Bonus if applicable
    if (!includeNavidadBonus) {
   
      total += (salary / 12) * workedMonthsBeforeDec;
    }
 

    // Show total liquidation result
    setTotalLiquidation(total.toFixed(2));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card title="Liquidation Calculator" style={{ width: 500 }}>
        <Form
          form={form}
          name="calculator_form"
          layout="vertical"
          onFinish={Calculate}
          autoComplete="off"
        >
          <Form.Item label="Monthly Salary (DOP)" name="salary" rules={[{ required: true, message: "Please input your salary!" }]}>
            <Input type="number" />
          </Form.Item>
         <Form.Item label="Bonus " name="bonus">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Extra Hours" name="extra_hours">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Did you get Preaviso?">
            <Switch  checkedChildren="Yes" unCheckedChildren="No" checked={includePreAviso}  onChange={() => setIncludePreAviso(!includePreAviso)} />
          </Form.Item>

          <Form.Item label="Worked Days Last Month" name="worked_Days">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Unused Vacations?">
            <Switch checkedChildren="Yes" unCheckedChildren="No" checked={includeVacaciones} onChange={() => setIncludeVacaciones(!includeVacaciones)} />
          </Form.Item>

          {includeVacaciones && (
            <Form.Item label="Years of Service" name="serviceTime">
              <Select
                defaultValue="14"
                options={[
                  { value: 14, label: "1-5 years of service" },
                  { value: 18, label: "More than 5 years" },
                ]}
              />
            </Form.Item>
          )}

          <Form.Item label="Received Christmas Bonus?">
            <Switch checkedChildren="Yes" unCheckedChildren="No" checked={includeNavidadBonus} onChange={() => setIncludeNavidadBonus(!includeNavidadBonus)} />
          </Form.Item>

          {!includeNavidadBonus && (
            <Form.Item label="Months Worked Before December" name="workedMonth">
              <Input type="number" />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Calculate
            </Button>
          </Form.Item>
        </Form>
 {totalLiquidation !== null && (
          <Results liquidacion={totalLiquidation}/>
        )}
       
      </Card>
 {/* Show the result dynamically */}
       
    </div>
  );
}

export default CalculatorForm;