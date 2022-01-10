
const Header = ({ text, fontSize=24, line=true, color, align, children }) => {

  return (
    <header className='ui-header'>
      <section style={{justifyContent: align}}>
        <div style={{fontSize: fontSize, color: color}}>{ text }</div>
        { children }
      </section>
      { line && <hr /> }
    </header>
  )
}

export default Header
