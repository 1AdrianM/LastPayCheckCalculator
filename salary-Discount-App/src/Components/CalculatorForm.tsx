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
  "work_duration"?:string;
}
function CalculatorForm() {
//useState for Switches, Select and Calculation Logic
  const [includeVacaciones, setIncludeVacaciones] = useState(false);
  const [includeNavidadBonus, setIncludeNavidadBonus] = useState(false);
  const [includePreAviso, setIncludePreAviso] = useState(false);
  //TOTAL OF LIQUIDATION OR LAST PAYCHECK
  const [totalLiquidation, setTotalLiquidation] = useState(0);

  const [form] = Form.useForm(); // To get form values
  const Calculate = (values: FormValues) => { 
    
    const salary = Number(values.salary);
    const workDuration = values["work_duration"];
    const LastWorked_Days = Number(values.worked_Days);
    const workedMonthsBeforeDec = Number(values["workedMonth"]) || 0;
    const bonus = Number(values.bonus);
    const extra_hours = Number(values.extra_hours);

    let total: number = 0;

    // Bonus Calculation (Fixed: Bonus is a fixed amount, not a percentage)
    total += bonus;

    // Extra Hours Calculation (Fixed: Uses hourly rate)
    if (extra_hours > 0) {
        const hourlyRate = salary / 160; // Assuming 160 work hours in a month
        total += extra_hours * hourlyRate;
    }

    // Adding Last Worked Days of the Month
    if (LastWorked_Days > 0) {
        total += (salary / 30) * LastWorked_Days;
    }

    // Preaviso Calculation (Only if not included)
    if (!includePreAviso) {
        let preavisoDays = 0;
        switch (workDuration) {
            case "3_6_months":
                preavisoDays = 6;
                break;
            case "6_12_months":
                preavisoDays = 13;
                break;
            case "1_5_years":
            case "5_more_years":
                preavisoDays = 28;
                break;
        }
        total += (salary / 30) * preavisoDays;
    }

    // Vacation Calculation (Only if unused vacations exist)
    if (includeVacaciones) {
        const vacationDays = workDuration === "5_more_years" ? 18 : 14;
        total += (salary / 30) * vacationDays;
    }

    // Christmas Bonus Calculation (Only if it wasn’t received)
    if (!includeNavidadBonus && workedMonthsBeforeDec > 0) {
        total += (salary / 12) * workedMonthsBeforeDec;
    }

    // Show total liquidation result
    setTotalLiquidation(Number(total.toFixed(2)));
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
         <Form.Item label="Bonus" name="bonus">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Extra Hours of Last Month" name="extra_hours">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Work Duration"
          name={"work_duration"}>
  <Select
  defaultValue={"Select"}
  options={[
    { value: "less_3_months", label: "Less than 3 months" },
    { value: "3_6_months", label: "3 to 6 months" },
    { value: "6_12_months", label: "6 to 12 months" },
    { value: "1_5_years", label: "1 to 5 years" },
    { value: "5_more_years", label: "More than 5 years" },
  ]}
   
  />
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