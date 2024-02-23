import React from "react";
import Banner from "../components/banner/Banner";
import { Grid, Table } from "@mui/material";
import Categories  from "./Categories";
import  Posts  from "./post/Posts";
import styled from "@emotion/styled";
import { Button } from "@mui/base";

const StyledTable=styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton=styled(Button)`
  margin: 20px;
  width: 85%;
  background: #6495ED;
  color: #fff;
`

const Home = () => {
  return (
    <div>
      <Banner />
      <Grid container>
        <Grid item lg={2} xs={12} sm={2}>
          <Categories />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          <Posts />
        </Grid>
      </Grid>
    </div>
  )
}

export default Home;
