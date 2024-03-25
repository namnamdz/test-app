//THIRD-IMPORT
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Pagination,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import _ from "lodash";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
//PROJECT-IMPORT
import { dispatch } from "store";
import { openSnackbar } from "store/slices/snackbarSlice";
import { country } from "constants/country";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "16px 32px",
  minWidth: "600px",
};
function createData(
  id: number,
  name: string,
  dob: string,
  phoneNumber: string,
  sex: string,
  address: string,
  marinProfile: string,
  notification: string,
  isEdit?: boolean
) {
  return {
    id,
    name,
    dob,
    phoneNumber,
    sex,
    marinProfile,
    address,
    notification,
    isEdit,
  };
}

const rows = [
  createData(
    1,
    "Frozen yoghurt",
    "01/02/1990",
    "0336906121",
    "1",
    "Nam Từ Liêm, Hà Nội",
    "Hồ sơ chính",
    "",
    false
  ),
  createData(
    2,
    "Frozen yoghurt",
    "01/02/1990",
    "0336906121",
    "1",
    "Nam Từ Liêm, Hà Nội",
    "Hồ sơ chính",
    "",
    false
  ),
  createData(
    3,
    "Frozen yoghurt",
    "01/02/1990",
    "0336906121",
    "1",
    "Nam Từ Liêm, Hà Nội",
    "Hồ sơ chính",
    "",
    false
  ),
  createData(
    4,
    "Frozen yoghurt",
    "01/02/1990",
    "0336906121",
    "1",
    "Nam Từ Liêm, Hà Nội",
    "Hồ sơ chính",
    "",
    false
  ),
  createData(
    5,
    "Frozen yoghurt",
    "01/02/1990",
    "0336906121",
    "1",
    "Nam Từ Liêm, Hà Nội",
    "Hồ sơ chính",
    "",
    false
  ),
  createData(
    6,
    "Frozen yoghurt",
    "01/02/1990",
    "0336906121",
    "1",
    "Nam Từ Liêm, Hà Nội",
    "Hồ sơ chính",
    "",
    false
  ),
  createData(
    7,
    "Frozen yoghurt",
    "01/02/1990",
    "0336906121",
    "1",
    "Nam Từ Liêm, Hà Nội",
    "Hồ sơ chính",
    "",
    false
  ),
  createData(
    8,
    "Frozen yoghurt",
    "01/02/1990",
    "0336906121",
    "1",
    "Nam Từ Liêm, Hà Nội",
    "Hồ sơ chính",
    "",
    false
  ),
  createData(
    9,
    "Frozen yoghurt",
    "01/02/1990",
    "0336906121",
    "1",
    "Nam Từ Liêm, Hà Nội",
    "Hồ sơ chính",
    "",
    false
  ),
];

const ListMedical = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [listData, setListData] = useState(rows);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);
  const [value, setValue] = useState(0);
  const [itemSelected, setItemSelected] = useState<any>({});
  const initialValues = {
    phoneNumber: "",
    fullName: "",
    sex: 1,
    bloodType: "",
    country: 1,
    dob: dayjs(),
    email: "",
    address: "",
  };
  const validationSchema = yup.object({
    phoneNumber: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .length(10, "Số diện thoại phải có 10 số"),
    fullName: yup
      .string()
      .required("Vui lòng nhập họ và tên")
      .max(50, "Họ và tên độ dài không quá 50 ký tự"),
    email: yup
      .string()
      .max(150, "Email độ dài không quá 150 ký tự")
      .email("Email không hợp lệ"),
    address: yup
      .string()
      .required("Vui lòng nhập địa chỉ")
      .max(255, "Địa chỉ độ dài không quá 255 ký tự"),
  });
  const formik: any = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      if (!Boolean(formik.errors)) {
        console.log("Add Success");
        handleAddNewProfile();
        handleClose();
      } else {
        console.log("fail");
      }
      formik.resetForm();
    },
  });

  const handleAddNewProfile = () => {
    if (Object.keys(formik.errors).length !== 0) {
      console.log(1, formik.errors);
      return;
    } else {
      console.log(2);
      const newData = createData(
        rows.length + 1,
        formik.values.fullName,
        dayjs(formik.values.dob).format("DD/MM/YYYY"),
        formik.values.phoneNumber,
        formik.values.sex,
        formik.values.address,
        "",
        ""
      );
      rows.unshift(newData);
      setListData(rows);

      dispatch(
        openSnackbar({
          open: true,
          message: `Thêm thành công: ${formik.values.fullName} ${formik.values.phoneNumber}`,
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "alert",
          alert: {
            color: "success",
          },
          close: true,
        })
      );
      formik.resetForm();
      handleClose();
    }
  };
  const handleOpen = () => setIsOpenModal(true);
  const handleClose = () => setIsOpenModal(false);
  const handleOpenModalConfirm = (row: any) => {
    setItemSelected(row);
    setIsOpenModalConfirm(true);
  };
  const handleCloseModalConfirm = () => setIsOpenModalConfirm(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangePhoneNumber = (e: any) => {
    setPhoneNumber(e);
  };
  const handleChangeName = (e: any) => {
    setName(e);
  };
  const handleSearch = _.debounce((name: string, phoneNumber: string) => {
    const result = rows.filter((item) => {
      return (
        item.phoneNumber.includes(phoneNumber) ||
        item.name.toLowerCase().includes(name)
      );
    });
    setListData(result);
  }, 300);
  const handleClickEdit = (item: any) => {
    console.log("edit", item);
    rows.forEach((el) => {
      el.isEdit = false;
    });
    item.isEdit = !item.isEdit;
  };
  const handleClickEditRow = (row: any) => {
    handleOpen();
  };
  const handleDeleteRow = () => {
    const result = listData.filter((el) => el.id != itemSelected.id);
    setListData(result);
    dispatch(
      openSnackbar({
        severity: "error",
        open: true,
        message: `Xóa thành công: ${itemSelected.name} ${itemSelected.phoneNumber} `,
        anchorOrigin: { vertical: "top", horizontal: "right" },
        variant: "alert",
        alert: {
          color: "success",
        },
        close: true,
      })
    );
    handleCloseModalConfirm();
  };
  useEffect(() => {
    handleSearch(name, phoneNumber);
  }, [name, phoneNumber, handleSearch]);
  return (
    <Box className="container">
      <Box
        className="search"
        sx={{
          marginBottom: "16px",
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box className="search__box" sx={{}}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Nhập SĐT để tìm kiếm"
            sx={{}}
            onChange={(e: any) => handleChangeName(e.target.value)}
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Nhập tên để tìm kiếm"
            onChange={(e: any) => handleChangePhoneNumber(e.target.value)}
            sx={{
              marginLeft: "6px",
            }}
          />
        </Box>
        <Box>
          <Button
            sx={{
              color: "#fff",
              backgroundColor: "#f29849",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f58b2f",
              },
            }}
            onClick={() => handleOpen()}
          >
            <AddOutlinedIcon />
            Thêm mới hồ sơ
          </Button>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ overflowX: "auto", maxWidth: "100%" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#ccc",
              }}
            >
              <TableCell>STT</TableCell>
              <TableCell>Hồ sơ</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Hồ sơ chính</TableCell>
              <TableCell>Thông báo</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    SĐT:
                    <Typography
                      sx={{
                        fontWeight: "600",
                        marginLeft: "4px",
                      }}
                    >
                      {row.phoneNumber}
                    </Typography>
                  </Box>
                  <Typography>Tên: {row.name}</Typography>
                  <Typography>
                    Giới tính:{" "}
                    {row.sex == "1"
                      ? "Nam"
                      : row.sex == "2"
                      ? "Nữ "
                      : "iới tính khác"}
                  </Typography>
                </TableCell>
                <TableCell>{row.dob}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.marinProfile}</TableCell>
                <TableCell>{row.marinProfile}</TableCell>
                <TableCell>
                  <MoreHorizOutlinedIcon
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleClickEdit(row)}
                  />
                  <Box
                    sx={{
                      display: row.isEdit ? "block" : "none",
                      position: "absolute",
                      right: "70px",
                      border: "1px solid #333",
                      padding: "12px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontStyle: "italic",
                        cursor: "pointer ",
                      }}
                      onClick={() => handleClickEditRow(row)}
                    >
                      Sửa hồ sơ
                    </Typography>
                    <Divider />
                    <Typography
                      sx={{
                        cursor: "pointer ",
                      }}
                      onClick={() => handleOpenModalConfirm(row)}
                    >
                      Xóa hồ sơ
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        className="pagination"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "12px 0",
        }}
      >
        <Box>Tổng số: {listData.length}</Box>
        <Pagination count={10} variant="outlined" />
      </Box>

      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          minWidth: "600px",
        }}
      >
        <Box sx={style}>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#f29849",
              },
            }}
          >
            <Tab
              label="Tạo mới hồ sơ"
              sx={{
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#f29849",
                },
              }}
            />
          </Tabs>
          <Box
            className="form"
            sx={{
              marginTop: "12px",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                Số điện thoại <Box sx={{ color: "red" }}> *</Box>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                autoComplete="phoneNumber"
                sx={{
                  height: "40px",
                  marginTop: 0,
                }}
                size="small"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Box>
            <Box
              sx={{
                marginTop: "12px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                Họ và tên <Box sx={{ color: "red" }}> *</Box>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                name="fullName"
                autoComplete="fullName"
                sx={{
                  height: "40px",
                  marginTop: 0,
                }}
                size="small"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "12px",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  Giới tính <Box sx={{ color: "red" }}>*</Box>
                </Box>
                <Select
                  labelId="sex"
                  id="sex"
                  value={formik.values.sex}
                  size="small"
                  sx={{
                    width: "100%",
                  }}
                  onChange={(e) => formik.setFieldValue("sex", e.target.value)}
                >
                  <MenuItem value={1}>Nam</MenuItem>
                  <MenuItem value={2}>Nữ</MenuItem>
                  <MenuItem value={3}>Giới tính khác</MenuItem>
                </Select>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  marginLeft: "12px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  Nhóm máu
                </Box>
                <Select
                  labelId="bloodType"
                  id="bloodType"
                  onChange={(e) =>
                    formik.setFieldValue("bloodType", e.target.value)
                  }
                  value={formik.values.bloodType}
                  displayEmpty
                  size="small"
                  sx={{
                    width: "100%",
                  }}
                >
                  <MenuItem disabled value="">
                    <em>-Chọn nhóm máu-</em>
                  </MenuItem>
                  <MenuItem value={1}>Nhóm A</MenuItem>
                  <MenuItem value={2}>Nhóm B</MenuItem>
                  <MenuItem value={3}>Nhóm AB</MenuItem>
                  <MenuItem value={4}>Nhóm O</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "12px",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  Ngày sinh <Box sx={{ color: "red" }}>*</Box>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={dayjs()}
                    maxDate={dayjs()}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "40px",
                      },
                    }}
                    onChange={(e) => formik.setFieldValue("dob", e)}
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  marginLeft: "12px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  Quốc gia
                </Box>
                <Select
                  labelId="country"
                  id="country"
                  value={formik.values.country}
                  displayEmpty
                  size="small"
                  sx={{
                    width: "100%",
                  }}
                  onChange={(e) =>
                    formik.setFieldValue("country", e.target.value)
                  }
                >
                  {country.map((el: any) => (
                    <MenuItem key={el.value} value={el.value}>
                      {el.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "12px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                Email
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                sx={{
                  height: "40px",
                  marginTop: 0,
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <Box
              sx={{
                marginTop: "12px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                Địa chỉ<Box sx={{ color: "red" }}> *</Box>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                name="address"
                autoComplete="address"
                sx={{
                  height: "40px",
                  marginTop: 0,
                }}
                size="small"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Box>
          </Box>
          <Box
            className="submit"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "12px",
            }}
          >
            <Button
              sx={{
                color: "#fff",
                backgroundColor: "#f29849",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#f58b2f",
                },
              }}
              onClick={() => handleAddNewProfile()}
            >
              Hoàn thành
            </Button>
            <Button
              sx={{
                color: "#e61809",
                backgroundColor: "#f7f3f2",
                textTransform: "none",
                marginLeft: "12px",
                "&:hover": {
                  backgroundColor: "#e0d2d1",
                },
              }}
              onClick={() => handleClose()}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={isOpenModalConfirm}
        onClose={handleCloseModalConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          minWidth: "600px",
        }}
      >
        <Box sx={{ ...style, border: "none" }}>
          <Box
            className="header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>Thông báo</Box>
            <CloseIcon
              sx={{
                cursor: "pointer",
              }}
              onClick={() => handleCloseModalConfirm()}
            />
          </Box>
          <Typography className="">
            Bạn có chắc chắn muốn xóa hồ sơ này
          </Typography>
          <Box
            className="submit"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "12px",
            }}
          >
            <Button
              sx={{
                color: "#fff",
                backgroundColor: "#f29849",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#f58b2f",
                },
              }}
              onClick={() => handleDeleteRow()}
            >
              Hoàn thành
            </Button>
            <Button
              sx={{
                color: "#e61809",
                backgroundColor: "#f7f3f2",
                textTransform: "none",
                marginLeft: "12px",
                "&:hover": {
                  backgroundColor: "#e0d2d1",
                },
              }}
              onClick={() => handleClose()}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ListMedical;
