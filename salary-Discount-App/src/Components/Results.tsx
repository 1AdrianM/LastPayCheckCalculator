
interface ResultProp{
    liquidacion:number

}

const Results:React.FC<ResultProp> =({liquidacion})=> {
  return (
    <div>
        <h1>Resultados</h1>
        <div style={{ marginTop: 20, fontSize: "1.2rem", fontWeight: "bold" }}>
            Total Liquidation: RD$ {liquidacion}
          </div>
    </div>
  )
}

export default Results