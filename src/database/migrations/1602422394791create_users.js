const query = 'CREATE TABLE users(id int AUTO_INCREMENT PRIMARY KEY,' 
+' full_name varchar(40), email varchar(30), password varchar(64), ' 
+ 'rol enum("client", "employee", "manager"), photo varchar(30))'

export default function create_users(conn){
    conn.query(query , (err)=>{
        if(err){
            console.log(err)
        }
    })
}