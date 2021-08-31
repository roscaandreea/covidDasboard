import React from 'react';
import './Legend.css';

const Legend = ({ legendItems }) => {
    return(
        <div className="containerStuff">
             {legendItems.map((item) => (
        <div
          key={item.title}
          style={{
            backgroundColor: item.color,
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center", // vertical
            justifyContent: "center", // horiztontal
            color: item.textColor != null ? item.textColor : "black",
            fontWeight: "bolder",
            fontSize: "0.70rem",
            height: "6vh",
          }}
        >
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;