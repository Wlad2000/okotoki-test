/****************************************************************************
** APP main
** contain: HeaderBar
**
**
****************************************************************************/
import styled from 'styled-components';
import Header from './components/bars/Header';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background: #1c1c1c;
  flex-direction: column;

`;

function App() {
  return (
    <Container>
      <Header/>
      {/*--CONTENT--*/}
    </Container>
  );
}

export default App;
