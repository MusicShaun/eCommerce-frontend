


import React from 'react'
import styled from 'styled-components'

function StripeButton() {
  return (
    <Button

      
      style={{

        border: 'none',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        height: '60px',
        padding: '0 35px',
        textTransform: 'uppercase',
        transition: 'all 0.3s ease',
        width: '250px'
      }}>GO TO PAYMENT
    </Button>
  )
}

export default StripeButton

const Button = styled.button`
  position: relative;
  margin: 1rem;;
  background-color: ${({ theme }) => theme.headerTop};
  font-size: ${({ theme }) => theme.fontL};

  &:hover {
    filter: brightness(1.5);
  }
  `