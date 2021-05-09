const crypto = require('crypto');
const nodemailer = require('nodemailer');
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config");
const fileUpload = require('express-fileupload');
const path = require('path')
//
app.use(cors());
app.use(express.json());
app.use(fileUpload());


app.use(express.static(path.join(__dirname, 'build')));
//ADD IMAGE
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.file;
  if (file.length > 1) {
    for (let i = 0; i < file.length; i++) {
      file[i].mv(`${__dirname}/../client/public/gallery/${file[i].name}`, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
      })
    };
  } else {
    file.mv(`${__dirname}/../client/public/gallery/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    })
  }
  res.send('file uploaded');
});

//ADD SHOE
app.post("/createshoe", (req, res) => {
  const id_kieugiay = req.body.id_kieugiay;
  const tengiay = req.body.tengiay;
  const tenmagiay = req.body.tenmagiay;
  const hinhanh = req.body.hinhanh;
  const giaban = req.body.giaban;
  const giakm = req.body.giakm;
  const tinhtrang = req.body.tinhtrang;
  const noidung = req.body.noidung;
  db.query(
    "INSERT INTO giay (id_kieugiay, tengiay, tenmagiay, hinhanh, giaban, giakm, tinhtrang, noidung) VALUES (?,?,?,?,?,?,?,?)",
    [id_kieugiay, tengiay, tenmagiay, hinhanh, giaban, giakm, tinhtrang, noidung],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//ADD SHOE DETAIL
app.post("/createshoedetail", (req, res) => {
  const id_giay = req.body.id_giay;
  const id_size = req.body.id_size;
  const id_color = req.body.id_color;
  const soluong = req.body.soluong;
  db.query(
    "INSERT INTO chitietgiay (id_giay, id_size, id_color, soluong) VALUES (?,?,?,?)",
    [id_giay, id_size, id_color, soluong],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//ADD SHOE GALLERY
app.post("/createshoegallery", (req, res) => {
  const id_giay = req.body.id_giay;
  const id_color = req.body.id_color;
  const image = req.body.image;
  for (let i = 0; i < image.length; i++) {
    db.query(
      "INSERT INTO gallery (id_giay, id_color, image) VALUES (?,?,?)",
      [id_giay, id_color, image[i]],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
  res.send("Values Inserted");
});

//GET SHOE TYPE
app.get("/shoetype", (req, res) => {
  db.query("SELECT * FROM kieugiay", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//GET SHOE COLOR
app.get("/shoecolor", (req, res) => {
  db.query("SELECT * FROM color", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//GET SHOE SIZE
app.get("/shoesize", (req, res) => {
  db.query("SELECT * FROM size", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//GET DISTINCT COLOR IN ARRAY
app.get("/shoedistinctcolor/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT distinct color,b.id_color,b.id_giay FROM giay a,chitietgiay b,color c, size d where b.id_giay = a.id_giay and b.id_color = c.id_color and b.id_size = d.id_size and b.id_giay = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//GET SHOE
app.get("/shoe", (req, res) => {
  db.query("select * from giay left join khuyenmai on giay.id_khuyenmai = khuyenmai.id_khuyenmai", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//GET SHOE DETAIL
app.get("/shoe/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM ((((giay a INNER JOIN chitietgiay b ON b.id_giay = a.id_giay ) INNER JOIN color c ON b.id_color = c.id_color) INNER JOIN size d ON b.id_size = d.id_size) LEFT JOIN khuyenmai e ON a.id_khuyenmai = e.id_khuyenmai) where a.id_giay = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


//GET SHOE GALLERY
app.get("/shoe/gallery/:id", (req, res) => {
  const id_giay = req.params.id;
  db.query("SELECT * from gallery a, color b where a.id_color = b.id_color and id_giay = ?", id_giay, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//ADD USER
app.post("/createuser", (req, res) => {
  const hoten = req.body.hoten;
  const diachi = req.body.diachi;
  const sodienthoai = req.body.sodienthoai;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  db.query(
    "SELECT * FROM user WHERE email = ? OR username = ? ",
    [email, username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if(result.length > 0){
          res.send('found')
        }else{
          db.query(
            "INSERT INTO user (hoten, diachi, sodienthoai, email, username, password, role) VALUES (?,?,?,?,?,?,?)",
            [hoten, diachi, sodienthoai, email, username, password, role],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.query("select * from user order by id_user desc limit 1", (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send(result);
                  }
                });
              }
            }
          );
        }
      }
    }
  );
});

//GET USER
app.get("/user", (req, res) => {
  db.query("SELECT * from user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

function checkQTY(cartItems, res) {
  for (let i = 0; i < cartItems.length; i++) {
    db.query(
      "select soluong from chitietgiay where id_chitietgiay = ?", cartItems[i].id_chitietgiay,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        else if (result[0].soluong < cartItems[i].soluong) {
          const shoeDetailFail = {
            tenmagiay: cartItems[i].tenmagiay,
            color: cartItems[i].color,
            sosize: cartItems[i].sosize,
          };
          if (res.headersSent === false) {
            res.send({ message: shoeDetailFail });
          }
        }
      }
    );
  }
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  })
}

//ADD INVOICE
app.post("/createinvoice", async function (req, res) {
  const id_user = req.body.id_user;
  const hoten = req.body.hoten;
  const sodienthoai = req.body.sodienthoai;
  const email = req.body.email;
  const trangthai = req.body.trangthai;
  const diachi = req.body.diachi;
  const loaithanhtoan = req.body.loaithanhtoan
  const cartItems = req.body.cartItems;
  const thanhtien = req.body.totalPrice;
  let id_donhang;
  await checkQTY(cartItems, res);
  if (res.headersSent === false) {
    db.query(
      "INSERT INTO donhang (id_user, hoten, sodienthoai, email, trangthai, diachi, loaithanhtoan, thanhtien) VALUES (?,?,?,?,?,?,?,?)",
      [id_user, hoten, sodienthoai, email, trangthai, diachi, loaithanhtoan, thanhtien],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
    db.query("select max(id_donhang) as id_donhang from donhang", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        id_donhang = result[0].id_donhang;
        for (let j = 0; j < cartItems.length; j++) {
          let soluong = cartItems[j].maxSoluong - cartItems[j].soluong
          db.query(
            "INSERT INTO chitietdonhang (id_donhang, id_chitietgiay, soluongsp, giabancuoi) VALUES (?,?,?,?)",
            [id_donhang, cartItems[j].id_chitietgiay, cartItems[j].soluong, cartItems[j].giakm],
            (err, result) => {
              if (err) {
                console.log(err);
              }
            }
          );
          db.query(
            "UPDATE chitietgiay SET soluong = ? WHERE id_chitietgiay = ?",
            [soluong, cartItems[j].id_chitietgiay],
            (err, result) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
        res.send('Success');
      }
    });
  }
});


//UPDATE SHOE
app.put("/updateshoe", (req, res) => {
  const id_giay = req.body.id_giay;
  const id_kieugiay = req.body.id_kieugiay
  const tengiay = req.body.tengiay;
  const tenmagiay = req.body.tenmagiay;
  const hinhanh = req.body.hinhanh;
  const giaban = req.body.giaban;
  const giakm = req.body.giakm;
  const tinhtrang = req.body.tinhtrang;
  const noidung = req.body.noidung;
  db.query(
    "UPDATE giay SET tengiay = ?, tenmagiay = ?, hinhanh = ? , giaban = ?, giakm = ?, tinhtrang = ?, noidung = ?, id_kieugiay = ? WHERE id_giay = ?",
    [tengiay, tenmagiay, hinhanh, giaban, giakm, tinhtrang, noidung, id_kieugiay, id_giay],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//DELELE SHOE
app.get("/deleteshoe/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM giay WHERE id_giay = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/deleteshoedetail", (req, res) => {
  const id_giay = req.body.id_giay;
  const id_chitietgiay = req.body.id_chitietgiay;
  const id_color = req.body.id_color
  db.query("DELETE FROM chitietgiay WHERE id_chitietgiay = ?", id_chitietgiay, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  db.query("select id_color from chitietgiay where id_giay = ? and id_color = ?", [id_giay, id_color], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length === 0) {
        db.query("DELETE FROM gallery WHERE id_color = ?", id_color, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result)
          }
        });
      } else {
        res.send(result)
      }
    }
  });
});
//DELETE GALLERY
app.get("/deletegallery/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM gallery WHERE id_gallery = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//UPDATE QTY
app.put("/updateqty", (req, res) => {
  const id_chitietgiay = req.body.id_chitietgiay;
  const soluong = req.body.soluong;
  db.query(
    "UPDATE chitietgiay SET soluong = ? WHERE id_chitietgiay = ?",
    [soluong, id_chitietgiay],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//ADD SIZE
app.post("/createsize", (req, res) => {
  const sosize = req.body.sosize;
  const trangthai = req.body.trangthai;
  db.query(
    "Select * from size",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let check = result.some(item => item.sosize === parseInt(sosize))
        if (check === true) {
          res.send('Đã Tồn Tại')
        } else {
          db.query(
            "INSERT INTO size (sosize, trangthai) VALUES (?,?)",
            [sosize, trangthai],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("Values Inserted");
              }
            }
          );
        }
      }
    })
})

//ADD COLOR
app.post("/createcolor", (req, res) => {
  const color = req.body.color;
  const trangthai = req.body.trangthai;
  db.query(
    "Select * from color",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let check = result.some(item => item.color.toLowerCase() === color.toLowerCase())
        if (check === true) {
          res.send('Đã Tồn Tại')
        } else {
          db.query(
            "INSERT INTO color (color, trangthai) VALUES (?,?)",
            [color, trangthai],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("Values Inserted");
              }
            }
          );
        }
      }
    })
})

//ADD TYPE
app.post("/createtype", (req, res) => {
  const tenkieugiay = req.body.tenkieugiay;
  const tinhtrang = req.body.tinhtrang;
  db.query(
    "Select * from kieugiay",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let check = result.some(item => item.tenkieugiay.toLowerCase() === tenkieugiay.toLowerCase())
        if (check === true) {
          res.send('Đã Tồn Tại')
        } else {
          db.query(
            "INSERT INTO kieugiay (tenkieugiay, tinhtrang) VALUES (?,?)",
            [tenkieugiay, tinhtrang],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("Values Inserted");
              }
            }
          );
        }
      }
    })
})

//UPDATE SIZE
app.put("/updatesize", (req, res) => {
  const id_size = req.body.id_size;
  const trangthai = req.body.trangthai;
  db.query(
    "UPDATE size SET trangthai = ? WHERE id_size = ?",
    [trangthai, id_size],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//UPDATE TYPE
app.put("/updatetype", (req, res) => {
  const id_kieugiay = req.body.id_kieugiay;
  const tinhtrang = req.body.tinhtrang;
  db.query(
    "UPDATE kieugiay SET tinhtrang = ? WHERE id_kieugiay = ?",
    [tinhtrang, id_kieugiay],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//UPDATE COLOR
app.put("/updatecolor", (req, res) => {
  const id_color = req.body.id_color;
  const trangthai = req.body.trangthai;
  db.query(
    "UPDATE color SET trangthai = ? WHERE id_color = ?",
    [trangthai, id_color],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//DELELE COLOR
app.delete("/deletecolor/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.query("DELETE FROM color WHERE id_color = ?", id, (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      res.send(result);
    }
  });
});


//DELELE SIZE
app.delete("/deletesize/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM size WHERE id_size = ?", id, (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      res.send(result);
    }
  });
});

//DELELE TYPE
app.delete("/deletetype/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM kieugiay WHERE id_kieugiay = ?", id, (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      res.send(result);
    }
  });
});

//GET ORDER
app.get("/order", (req, res) => {
  db.query("Select * FROM donhang", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result);
    }
  });
});

//GET ORDER
app.get("/orderdetail/:id", (req, res) => {
  const id = req.params.id
  db.query(" SELECT * FROM chitietdonhang a,chitietgiay b, giay c, size d, color e where a.id_chitietgiay  = b.id_chitietgiay and  c.id_giay = b.id_giay and b.id_color = e.id_color and b.id_size = d.id_size and id_donhang = ?", id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result);
    }
  });
});

//UPDATE COLOR
app.put("/updateorder", (req, res) => {
  const id_donhang = req.body.id_donhang;
  const trangthai = req.body.trangthai;
  db.query(
    "UPDATE donhang SET trangthai = ? WHERE id_donhang = ?",
    [trangthai, id_donhang],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//UPDATE PASSWORD
app.put("/updatepassword", (req, res) => {
  const id_user = req.body.id_user;
  const oldPass = req.body.oldPass;
  const newPass = req.body.newPass;
  db.query(
    "SELECT * FROM user WHERE id_user = ? ", id_user, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let check = result.some(item => item.password === oldPass)
        if (check === false) {
          res.send('false')
        } else {
          db.query(
            "UPDATE user SET password = ? WHERE id_user = ?",
            [newPass, id_user],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send('true');
              }
            }
          );
        }
      }
    }
  );
});

//GET ORDER USER
app.get("/userorder/:id", (req, res) => {
  const id = req.params.id
  db.query("Select * FROM donhang where id_user = ?", id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result);
    }
  });
});

//UPDATE USER
app.put("/updateuser", (req, res) => {
  const id_user = req.body.id_user;
  const hoten = req.body.hoten;
  const diachi = req.body.diachi;
  const email = req.body.email;
  const sodienthoai = req.body.sodienthoai;
  db.query(
    "UPDATE user SET hoten = ?, diachi = ?, email = ?, sodienthoai = ? WHERE id_user = ?",
    [hoten, diachi, email, sodienthoai, id_user],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//GET BEST SELLING
app.get("/bestselling", (req, res) => {
  db.query("Select sum(a.soluongsp) as banchay , c.id_giay,tenmagiay,tengiay,hinhanh,giaban,giakm,c.id_kieugiay,d.phantramkhuyenmai,d.trangthai From chitietdonhang a, chitietgiay b , giay c left join khuyenmai d on c.id_khuyenmai = d.id_khuyenmai  Where a.id_chitietgiay = b.id_chitietgiay and b.id_giay = c.id_giay and c.tinhtrang = '1'  group by b.id_giay order by banchay desc limit 3", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result);
    }
  });
});

//GET NEW PRODUCT
app.get("/newproduct", (req, res) => {
  db.query("select * from giay a left join khuyenmai b on a.id_khuyenmai = b.id_khuyenmai where tinhtrang='1' order by id_giay desc limit 3", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result);
    }
  });
});

//GET RELATE PRODUCT
app.get("/relateproduct/:id", (req, res) => {
  const id = req.params.id
  db.query("select * from giay where id_kieugiay = ? and tinhtrang='1' ORDER BY RAND() limit 5", id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result);
    }
  });
});

//GET TRANG
app.get("/page", (req, res) => {
  db.query("select * from giay", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      let page = Math.ceil(result.length / 12)
      res.send({ message: page });
    }
  });
});

//GET SHOE DEPEND ON PAGE
app.get("/page/:id", (req, res) => {
  let tempPageNum = 0;
  const pageNum = req.params.id
  if (pageNum > 1) {
    tempPageNum = (pageNum * 12) - 12
  }
  db.query("select * from giay a left join khuyenmai b on a.id_khuyenmai = b.id_khuyenmai where tinhtrang = '1' limit ? , 12", tempPageNum, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result);
    }
  });
});

//GET SHOE DEPEND ON SHOE TYPE
app.get("/shoeontype/:id", (req, res) => {
  const id = req.params.id
  db.query("select * from giay where tinhtrang = '1' and id_kieugiay = ?", id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

//GET ACTIVE SHOE
app.get("/activeshoe", (req, res) => {
  db.query("SELECT * FROM giay where tinhtrang='1'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//RESET PASSWORD
app.put("/resetpassword", (req, res) => {
  const id_user = req.body.id_user;
  const password = req.body.password
  db.query(
    "UPDATE user SET password = ? WHERE id_user = ?",
    [password, id_user],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//UPDATE ROLE
app.put("/updaterole", (req, res) => {
  const id_user = req.body.id_user;
  const role = req.body.role
  db.query(
    "UPDATE user SET role = ? WHERE id_user = ?",
    [role, id_user],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//STATISTIC
app.get("/doanhthu/:year", (req, res) => {
  const year = req.params.year
  db.query("SELECT month(ngaytao) as thang, SUM(thanhtien) as DoanhThu from donhang where year(ngaytao) = ? group by month(ngaytao)", year, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//STATISTIC
app.get("/tongsoluong/:year", (req, res) => {
  const year = req.params.year
  db.query("SELECT month(ngaytao) as thang, SUM(b.soluongsp) as tongsoluong FROM donhang a, chitietdonhang b where a.id_donhang = b.id_donhang and year(ngaytao) = ? GROUP BY month(ngaytao)", year, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//STATISTIC
app.get("/doanhthungay/:month", (req, res) => {
  const month = req.params.month
  db.query("select day(ngaytao) as Ngay,sum(thanhtien) as DoanhThuNgay from donhang where month(ngaytao) = ? group by day(ngaytao)", month, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//STATISTIC
app.get("/tongsoluongngay/:month", (req, res) => {
  const month = req.params.month
  db.query("SELECT day(ngaytao) as Ngay , SUM(b.soluongsp) as TongSoLuong FROM donhang a, chitietdonhang b where a.id_donhang = b.id_donhang and month(ngaytao) = ? GROUP BY day(ngaytao);", month, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//SALE
app.post("/createsale", (req, res) => {
  let makhuyenmai = req.body.makhuyenmai
  makhuyenmai = makhuyenmai.trim().toLowerCase()
  const tenkhuyenmai = req.body.tenkhuyenmai
  const batdau = req.body.batdau
  const ketthuc = req.body.ketthuc
  const phantramkhuyenmai = req.body.phantramkhuyenmai
  const trangthai = req.body.trangthai
  db.query("SELECT makhuyenmai FROM khuyenmai where makhuyenmai = ?", makhuyenmai, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length === 0) {
        db.query("INSERT INTO khuyenmai (makhuyenmai,tenkhuyenmai,batdau,ketthuc,phantramkhuyenmai,trangthai) VALUES (?,?,?,?,?,?)",
          [makhuyenmai, tenkhuyenmai, batdau, ketthuc, phantramkhuyenmai, trangthai], (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          });
      } else res.send("false")
    }
  });
});

//GET SALE 
app.get("/sale", (req, res) => {
  db.query("select * from khuyenmai", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

//UPDATE SHOE SALE
app.put("/updateshoesale", (req, res) => {
  const id_giay = req.body.id_giay;
  const id_khuyenmai = req.body.id_khuyenmai;
  db.query(
    "UPDATE giay SET id_khuyenmai = ? WHERE id_giay = ?",
    [id_khuyenmai, id_giay],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//UPDATE SALE STATUS
app.put("/updatesalestatus", (req, res) => {
  const trangthai = req.body.trangthai;
  const id_khuyenmai = req.body.id_khuyenmai;
  db.query(
    "UPDATE khuyenmai SET trangthai = ? WHERE id_khuyenmai = ?",
    [trangthai, id_khuyenmai],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//GET SHOE DEPEND ON SHOE TYPE ADMIN
app.get("/shoeontypeadmin/:id", (req, res) => {
  const id = req.params.id
  db.query("select * from giay where id_kieugiay = ?", id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

//UPDATE SALE FOR SHOE
app.put("/updatesaleforshoe", (req, res) => {
  const id_giay = req.body.id_giay;
  const id_khuyenmai = req.body.id_khuyenmai;
  id_giay.forEach(item => {
    db.query('update giay set id_khuyenmai = ? where id_giay = ?', [id_khuyenmai, item.id_giay],
      (err, result) => {
        if (err) {
          console.log(err)
          res.send(err);
        }
      }
    );
  })
  res.send("success")
});

//DELELE SALE
app.delete("/deletesale/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM khuyenmai WHERE id_khuyenmai = ?", id, (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      res.send(result);
    }
  });
});

//UPLOAD BANNER URL
app.post("/uploadbannerurl", (req, res) => {
  const imageURL = req.body.imageURL;
  const id_tintuc = req.body.id_tintuc
  db.query("INSERT INTO banner (url_banner,id_tintuc) values(?,?)", [imageURL, id_tintuc], (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      res.send(result);
    }
  });
});

//GET BANNER 
app.get("/banner", (req, res) => {
  db.query("select * from banner", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

//DELELE BANNER
app.delete("/deletebanner/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM banner WHERE id_banner = ?", id, (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      res.send(result);
    }
  });
});

//SEND RESET MAIL
app.post("/userresetpassword", (req, res) => {
  const email = req.body.email;
  db.query("Select * from user where email = ?", email, (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      if (result.length === 0) {
        res.send("email not found")
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        const tokenTime = Date.now() + 300000;
        db.query("update user set pwdtoken = ?, tokentime = ? where id_user = ?", [token, tokenTime, result[0].id_user], (err, result) => {
          if (err) {
            console.log(err)
            res.send(err);
          }
        })
        const trans = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `hieugiaynhuy@gmail.com`,
            pass: `tudimatim1`,
          },
        });
        const mailOptions = {
          from: 'Hiệu Giày Như Ý',
          to: `${email}`,
          subject: 'Đường Dẫn Để Reset Mật Khẩu',
          text:
            'Bạn nhận được mail này vì bạn (hoặc một ai đó) đã gửi yêu cầu reset mật khẩu tài khoản của bạn.\n\n'
            + 'Làm ơn hãy nhấp vào đường dẫn sau, hoặc dán nó vào trình duyệt của bạn để hoàn thành quá trình: \n\n'
            + `http://hieugiaynhuy.tk/resetpwd/${token}\n\n`
            + 'Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này và kiểm tra lại tài khoản của bạn.\n\n'
            + 'Lưu Ý: Đường dẫn này chỉ có hiệu lực trong vòng 5 phút, tính từ lúc gửi yêu cầu!\n',
        };
        trans.sendMail(mailOptions, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result)
          }
        })
      }
    }
  });
});

//SEND MAIL TO USER WHEN THEY GET ORDER
app.post("/sendmailtouser", (req, res) => {
  const id_user = req.body.id_user;
  const hoten = req.body.hoten;
  const sodienthoai = req.body.sodienthoai;
  const email = req.body.email;
  const trangthai = req.body.trangthai;
  const diachi = req.body.diachi;
  const loaithanhtoan = req.body.loaithanhtoan
  const cartItems = req.body.cartItems;
  const thanhtien = req.body.totalPrice;
  const trans = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `hieugiaynhuy@gmail.com`,
      pass: `tudimatim1`,
    },
  });
  let htmlContent = "";
  cartItems.forEach(item => {
    htmlContent = htmlContent + `
      <div><img height='100px' width='150px' src="http://113.165.38.131:3000/gallery/${item.hinhanh}" />
        <p>Tên Giày: ${item.tengiay}</p>
        <p>Mã Giày: ${item.tenmagiay}</p>
        <p>Số Size: ${item.sosize}</p>
        <p>Màu: ${item.color}</p>
        <p>Số Lượng: ${item.soluong}</p>
      </div>
      `
  })
  const mailOptions = {
    from: 'Hiệu Giày Như Ý',
    to: `${email}`,
    subject: 'Đây Là Đơn Đặt Hàng Của Bạn',
    html: htmlContent + `<h4>Thành tiền ${thanhtien}<h4/>`,
  };
  
  trans.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result)
    }
  })
  db.query("select * from user where role = 'admin'", (err, result) => {
    if (err) {
      console.log(err)
      res.send(err);
    }else{
      let emailAdmin = '';
      result.forEach(item=>{
        emailAdmin = emailAdmin + item.email + ','
      })
      const mailForAdmin = {
        from: 'Hiệu Giày Như Ý',
        to: `${emailAdmin}`,
        subject: 'Bạn Vừa Có Đơn Đặt Hàng Mới!',
        html: `<h3>Đơn hàng được tạo vào: ${Date()}</h3><p>Tên khách hàng : ${hoten}</p><p>Số điện thoại: ${sodienthoai}</p><p style='color:red'>Chi tiết xem tại http://localhost:3000/readorder/></p>`
      };
      trans.sendMail(mailForAdmin, (err, result) => {
        if (err) {
          console.log(err);
        }
      })
    }
  })
});

//CHECK AUTH RESET
app.post("/checkauthreset", (req, res) => {
  const authToken = req.body.authToken;
  const expireTime = Date.now();
  db.query("SELECT * from user where pwdtoken = ?", authToken, (err, result) => {
    if (err) {
      console.log(err)
      res.send(err);
    } else {
      if (result.length === 0) {
        res.send("token not found")
      } else {
        if (result[0].tokentime < expireTime) {
          res.send("token expired")
        } else {
          res.send(result)
        }
      }
    }
  });
});


//RESET PASSWORD 
app.post("/userauthresetpwd", (req, res) => {
  const password = req.body.password;
  const id_user = req.body.id_user
  db.query("update user set password = ? where id_user = ?", [password, id_user], (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      res.send(result);
    }
  });
});

//CREATE COMMENT
app.post("/createcomment", (req, res) => {
  const id_giay = req.body.id_giay;
  const id_user = req.body.id_user;
  const noidung = req.body.noidung;
  const tieude = req.body.tieude;
  const hoten = req.body.hoten;
  const sosao = req.body.sosao;
  db.query(
    "INSERT INTO binhluan (id_giay, id_user, noidung, sosao, tieude, hoten) VALUES (?, ?, ?, ?, ?, ?)",
    [id_giay, id_user, noidung, sosao, tieude, hoten],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//GET COMMENT
app.get("/getcomment/:id", (req, res) => {
  const id_giay = req.params.id
  db.query(
    "Select * from binhluan where id_giay = ?", id_giay,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//CREATE REPLY
app.post("/createreply", (req, res) => {
  const id_binhluan = req.body.id_binhluan;
  const phanhoi = req.body.phanhoi;
  const tenqtv = req.body.tenqtv;
  db.query(
    "UPDATE binhluan SET phanhoi = ?, tenqtv = ?  WHERE id_binhluan = ?",
    [phanhoi, tenqtv, id_binhluan],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//DELELE ORDER
app.delete("/deleteorder/:id", (req, res) => {
  const id = req.params.id;
  db.query("select * from chitietdonhang a,chitietgiay b where a.id_chitietgiay = b.id_chitietgiay and id_donhang = ?", id, (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      result.forEach(item => {
        let newQty = item.soluong + item.soluongsp
        db.query(
          "UPDATE chitietgiay SET soluong = ?  WHERE id_chitietgiay = ?",
          [newQty, item.id_chitietgiay],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send('error')
            }
          });
      })
      db.query(
        "Delete from donhang where id_donhang = ?", id,
        (err, result) => {
          if (err) {
            console.log(err);
            res.send('error')
          } else {
            res.send('success')
          }
        });
    }
  });
});

//GET NEWS 
app.get("/news", (req, res) => {
  db.query("select * from tintuc", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

//CREATE NEWS
app.post("/createnews", (req, res) => {
  const imageURL = req.body.imageURL;
  const tieude = req.body.newValues.tieude
  const nguoiviet = req.body.newValues.nguoiviet
  const content = req.body.newValues.content
  const loaitintuc = req.body.newValues.loaitintuc
  const tomtat = req.body.newValues.tomtat
  const maubia = req.body.newValues.maubia
  db.query("INSERT INTO tintuc (tieude,nguoiviet,noidung,anhbia,loaitintuc,tomtat,maubia) values(?,?,?,?,?,?,?)", [tieude, nguoiviet, content, imageURL, loaitintuc, tomtat, maubia], (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      res.send(result);
    }
  });
});

//DELETE NEWS
app.get("/deletenews/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM tintuc WHERE id_tintuc = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      res.send(result);
    }
  });
});

//GET NEWS DETAIL
app.get("/newsdetail/:id", (req, res) => {
  const id = req.params.id
  db.query("select * from tintuc where id_tintuc = ?", id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

//UPDATE NEWS
app.put("/updatenews", (req, res) => {
  const imageURL = req.body.imageURL;
  const tieude = req.body.newValues.tieude
  const nguoiviet = req.body.newValues.nguoiviet
  const content = req.body.newValues.content
  const loaitintuc = req.body.newValues.loaitintuc
  const tomtat = req.body.newValues.tomtat
  const maubia = req.body.newValues.maubia
  const id_tintuc = req.body.newValues.id_tintuc
  db.query("UPDATE tintuc SET tieude = ? , nguoiviet = ?, noidung = ?, anhbia = ?, loaitintuc = ?, tomtat = ?, maubia = ? where id_tintuc = ?", [tieude, nguoiviet, content, imageURL, loaitintuc, tomtat, maubia, id_tintuc], (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      res.send(result);
    }
  });
});

//LOGIN
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "select * from user where username = ? and password = ?",
    [username,password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if(result.length > 0){
          res.send(result);
        }else{
          res.send('fail')
        }
      }
    }
  );
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Yey, your server is running on port " + process.env.PORT);
});
