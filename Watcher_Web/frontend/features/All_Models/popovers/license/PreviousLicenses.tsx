import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function PreviousLicenses() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/license").then((res) => {
      setData(res.data.data);
    });
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <>
          {data.map((item, index) => {
            return (
              <>
                <Box
                  sx={{
                    marginTop: "20px",
                    px: 1,
                    background: "#34353A",
                    border: "0.2px solid #34353A",
                    borderRadius: "8px",
                  }}
                >
                    <Typography>
                        
                    </Typography>
                </Box>
              </>
            );
          })}
        </>
      ) : null}
    </>
  );
}

export default PreviousLicenses;
