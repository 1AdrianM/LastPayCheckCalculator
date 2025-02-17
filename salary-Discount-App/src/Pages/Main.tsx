import { Layout } from "antd"
import CalculatorForm from "../Components/CalculatorForm"
import FooterComponent from "../Components/FooterComponent"
import NavBar from "../Components/NavBar"
import { Content } from "antd/es/layout/layout"

function Main() {
  return (
    <Layout>
    <NavBar/>
    <Content>
    <CalculatorForm/>
    </Content>
    <FooterComponent/>
    </Layout>)
}

export default Main