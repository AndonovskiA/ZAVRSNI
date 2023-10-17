import http from '../http-common';

class studentDataService {
  async getAll() {
    return await http.get('/student');
  }



  async getByID(ID) {
    return await http.get('/student/' + ID);
  }

  async post(student){
    //console.log(smjer);
    const odgovor = await http.post('/student',student)
       .then(response => {
         return {ok:true, message: 'Student added'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, message: error.response.data}; // return u odgovor
       });
 
       return answer;
  }

  async put(ID,student){
    const odgovor = await http.put('/student/' + ID,student)
       .then(response => {
         return {ok:true, message: 'Student changed'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
     }


  async delete(ID){
    
    const answer = await http.delete('/student/' + ID)
       .then(response => {
         return {ok:true, message: 'Succesfully deleted student'};
       })
       .catch(error => {
         console.log(error);
         return {ok:false, message: error.response.data};
       });
 
       return answer;
     }


     async searchStudent(condition) {
      console.log('Searching s: ' + condition);
      return await http.get('/student/search/'+condition);
    }
     
 
}

export default new studentDataService();