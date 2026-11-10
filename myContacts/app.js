import express from "express"; //익스프레스 불러오기
import { router } from "./routes/contactRoutes.js"; //라우터 파일에서 라우트코드 불러오기
import { router as loginRouter } from "./routes/loginRoute.js";
import dbConnect from "./config/dbConnect.js"; //db 모듈 가져오기
import methodOverride from "method-override";

const app = express(); //app이라는 이름을 가진 서버 생성
dbConnect();  //db 연결



app.set("view engine", "ejs");  //어떤 템플릿을 사용할지 설정
app.set("views", "./views") //그 템플릿은 어디에 저장되어있는지 알려줌

app.use(express.static("./public"));

app.use(methodOverride("_method"));


app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use("/contacts", router);
app.use("/", loginRouter);


app.listen(3000, () => {
  console.log("서버 실행 중");
});

