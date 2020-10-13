const query = 'CREATE TABLE carts (id INT AUTO_INCREMENT PRIMARY KEY, ' 
+ 'date_create DATE DEFAULT CURDATE(), last_update DATE DEFAULT CURDATE(), ' 
+ 'user_id INT, CONSTRAINT FOREIGN KEY (user_id) REFERENCES users(id) ' 
+ 'ON UPDATE CASCADE ON DELETE CASCADE)'
export default function create_carts(conn){
	conn.query(query , (err)=>{
		if(err){
			console.log(err)
		}
	})
}
