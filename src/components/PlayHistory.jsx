// ** Material UI Imports
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Typography, Stack } from "@mui/material";

// ** Parse Imports
import Parse from "parse";

// ** Styled Components
import { HistoryTable } from "./styledComponents";

// ** Match History Component
const PlayHistory = () => {
  // ** User for History
  const user = Parse.User.current();

  // JSX Render for Match History
  return (
    <Stack spacing={6}>
      <Typography
        variant="h2"
        fontFamily={"Lobster"}
        color={"#ffffff"}
        mt={"5rem"}
      >
        Match History
      </Typography>
      <TableContainer component={Box}>
        <HistoryTable
          sx={{
            minWidth: { xs: "100vw", sm: "80vw", md: "60vw" },
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ "& > *": { borderColor: "#330033 !important" } }}>
              <TableCell>
                <Typography
                  color={"#ffffff"}
                  variant={"h6"}
                  fontFamily={"Lobster"}
                >
                  Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color={"#ffffff"}
                  variant={"h6"}
                  fontFamily={"Lobster"}
                >
                  Opponent
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color={"#ffffff"}
                  variant={"h6"}
                  fontFamily={"Lobster"}
                >
                  Result
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user ? (
              user.attributes.history.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "& > *": { borderColor: "#330033 !important" },
                  }}
                >
                  <TableCell>
                    <Typography color={"#ffffff"} variant={"h6"}>
                      {`${row.date.getFullYear()}/${
                        row.date.getMonth() + 1
                      }/${row.date.getDate()}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color={"#ffffff"} variant={"h6"}>
                      {row.opponent}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={
                        row.result === "Win"
                          ? "#00e600"
                          : row.result === "Loss"
                          ? "#ff0066"
                          : "#ffffff"
                      }
                      variant={"h6"}
                    >
                      {row.result}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "& > *": { borderColor: "#330033 !important" },
                }}
              >
                <TableCell>
                  <Typography color={"#ffffff"} variant={"h6"}>
                    Login to see your history!
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </HistoryTable>
      </TableContainer>
    </Stack>
  );
};

export default PlayHistory;
