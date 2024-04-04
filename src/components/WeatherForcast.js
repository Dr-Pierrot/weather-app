import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import clear from "../assets/clear-sky.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import heavy from "../assets/heavy-rain.png";
import snow from "../assets/snow.png";
import humid from "../assets/mist.png";
import wind from "../assets/wind.png";
import logo from "../assets/climate.png";
import axios from "axios";

const WeatherForcast = () => {
  const [search, setSearch] = useState("");
  const [temp, setTemp] = useState(0);
  const [name, setName] = useState("Search");
  const [hum, setHum] = useState(0);
  const [win, setWin] = useState(0);
  const [wicon, setWicon] = useState(cloud);
  const api_key = "2dc91a1a7b4d40d594731718240404";

  const Search = async (event) => {
    event.preventDefault();
    if (search === "") {
      return 0;
    }
    let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${search}&aqi=no`;
    try {
      const response = await axios({
        method: "get",
        url: url,
        withCredentials: false,
      });
      let data = await response.data;
      console.log(data.location.name);
      setName(data.location.name);
      setTemp(data.current.temp_c);
      setHum(data.current.humidity);
      setWin(data.current.wind_kph);
      let code = data.current.condition.code;
      if (code === 1000) {
        setWicon(clear);
      } else if (code < 1010) {
        setWicon(cloud);
      } else if (code > 1073) {
        setWicon(drizzle);
      } else if (code === 1087) {
        setWicon(heavy);
      } else if (code === 1117) {
        setWicon(snow);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Grid item xs={4} sx={{ boxShadow: 5, padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              marginBottom: 5,
              boxShadow: 5,
            }}
          >
            <img src={logo} style={{ width: 25 }} />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <InputBase
              onChange={(e) => setSearch(e.currentTarget.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Location"
              inputProps={{ "aria-label": "search location" }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={Search}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        <Box sx={{ display: "grid", justifyContent: "center" }}>
          <img src={wicon} style={{ width: 160 }} />
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            {`${temp}°C`}
          </Typography>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            {name}
          </Typography>
        </Box>
        <Grid
          container
          spacing={10}
          direction="row"
          justifyContent="center"
          sx={{ marginTop: 1 }}
        >
          <Grid
            item
            xs={"auto"}
            gap={2}
            sx={{ display: "flex", alignItems: "flex-start" }}
          >
            <img src={humid} style={{ width: 40 }} />
            <Box>
              <Typography sx={{ fontSize: "1rem" }}>{`${hum}%`}</Typography>
              <Typography sx={{ fontSize: "1rem" }}>Humidity</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={"auto"}
            gap={1}
            sx={{ display: "flex", alignItems: "flex-start" }}
          >
            <img src={wind} style={{ width: 40 }} />
            <Box>
              <Typography sx={{ fontSize: "1rem" }}>{`${win}kp/h`}</Typography>
              <Typography sx={{ fontSize: "1rem" }}>Humidity</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeatherForcast;
