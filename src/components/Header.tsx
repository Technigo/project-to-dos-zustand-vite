import styled from "styled-components"
import checkMark from "../assets/check-solid.svg" 


const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 15px;
  justify-content: flex-start; 

  h1 {
    font-size: 4rem; 
    color: #FFF;
    margin: 0;
    font-family: "Reenie Beanie";

    @media (max-width: 480px) {
      font-size: 2.8rem; 
    }

    @media (max-width: 768px) {
    padding: 30px 0px 15px;  
  }

    @media (min-width: 1024px) {
      font-size: 5rem; 
    }
  }
`;

const HeaderImg = styled.img`
  max-width: 100%;    
  width: 4rem;
  height: auto;

   @media (max-width: 480px) {
   width: 3rem; 

  }
`;

export const Header = () => {
  return (
    <header>
      <HeaderContent>
        <h1>My To Do List <HeaderImg src={checkMark} alt="Check-mark" className="checkmark" /></h1>
      </HeaderContent>
    </header>
  )
}
