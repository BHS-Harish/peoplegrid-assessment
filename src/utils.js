import {db} from './db'
import {addDoc,collection,getDocs, query, where} from 'firebase/firestore'
export const addReview=async(data)=>{
    const {email}=data
    const isExits=await getDocs(query(collection(db,"reviews"),where("email","==",email)))
    if(isExits.docs.length!=0){
        return {status:false,message:"Email already exists 👀"}
    }
    const res=await addDoc(collection(db,"reviews"),data)
    return {status:true,message:"Review added 🥳"}
}

export const getReviews=async()=>{
    const res=await getDocs(collection(db,"reviews"))
    let reviews=[]
    res.docs?.map((review)=>{
        reviews.push(review.data())
    })
    return reviews;
}