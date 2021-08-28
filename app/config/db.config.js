module.exports = {
   // HOST: "10.0.0.254",
   // USER: "devone",
   // PASSWORD: "uni_Dijla_87601",
   // USER: "signupapp",
   // PASSWORD: "Aa123123!@",
   HOST: "localhost",
   USER: "root",
   PASSWORD: "Hh123123!@",
   //PASSWORD: "vA47u2Byx5LmbjDj",
   DB: "documents",
   PORT: 3306,
};

// var pool = mysql2.createPool({
//    connectionLimit: 100,
//    host: "10.0.0.254",
//    port: 3306,
//    user: "signupapp",
//    password: "Aa123123!@",
//    database: "documents",
// });

// pool.getConnection(function (err, conn) {
//    if (err) {
//       console.log(err);
//    } else {
//       console.log(conn);
//    }
// });

// GRANT ALL PRIVILEGES ON documents.* TO devone@'10.0.0.161' IDENTIFIED BY 'uni_Dijla_87601';
// CREATE USER 'remote'@'10.0.0.161' IDENTIFIED WITH mysql_native_password BY 'uni_Dijla_87601';
//GRANT ALL PRIVILEGES ON *.* TO 'devone'@'%' WITH GRANT OPTION;
//update user set authentication_string=PASSWORD("uni_Dijla_87601") where User='root';

// UPDATE mysql.user SET password = PASSWORD('uni_Dijla_87601') WHERE user = 'root';
// UPDATE mysql.user SET authentication_string='uni_Dijla_87601' WHERE user='root';
// UPDATE mysql.user SET authentication_string='uni_Dijla_87601' WHERE User='root';
//update user set authentication_string=PASSWORD("uni_Dijla_87601") where User='root';
//CREATE USER 'devTwo'@'localhost' IDENTIFIED WITH authentication_plugin BY 'uni_Dijla_87601';
//CREATE USER 'devTwo'@'localhost' IDENTIFIED WITH mysql_native_password BY 'uni_Dijla_87601';

//ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'uni_Dijla_87601';
//GRANT PRIVILEGE ON *.* TO 'devTwo'@'localhost' WITH GRANT OPTION;
//ALTER USER 'devTwo'@'localhost' IDENTIFIED WITH mysql_native_password BY 'uni_Dijla_87601';
//GRANT ALL PRIVILEGES ON *.* TO 'devTwo'@'localhost' WITH GRANT OPTION;

//GRANT PRIVILEGE ON *.* TO 'devTwo'@'host';

//ALTER USER 'devTow'@'localhost' IDENTIFIED WITH mysql_native_password BY 'uni_Dijla_87601'
//ALTER USER 'devTow'@'localhost' IDENTIFIED BY 'uni_Dijla_87601';
