import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({
  name : {
    type : String,
    required :[true, "이름을 입력하세요."]
  },
  email : {
    type : String
  },
  phone : {
    type : String,
    required : [true, "전화번호를 입력하세요."]
  }
},
{
  timestamps : true
}
);

// 스키마 -> 모델  변환 방법
//mongoose.model(모델 명, 스키마 명)

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;