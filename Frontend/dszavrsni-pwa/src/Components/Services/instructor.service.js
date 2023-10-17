import http from "../http-common";


class instructorDataService{

    async get(){
        return await http.get('/Instructor');
    }

    async getByID(ID) {
        return await http.get('/instructor/' + ID);
      }

    async delete(ID){
        const answer = await http.delete('/Instructor/' + ID)
        .then(response => {
            return {ok: true, message: 'Succesfully deleted'};
        })
        .catch(e=>{
            return {ok: false, message: e.response.data};
        });

        return answer;
    }


    async post(instructor){
        //console.log(instructor);
        const answer = await http.post('/instructor',instructor)
           .then(response => {
             return {ok:true, message: 'Instructor added'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, message: error.response.data}; // return u odgovor
           });
     
           return answer;
    }

    async put(ID,instructor){
        //console.log(smjer);
        const answer = await http.put('/instructor/' + ID,instructor)
           .then(response => {
             return {ok:true, message: 'Instructor changed'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, message: error.response.data}; // return u odgovor
           });
     
           return answer;
         }

}

export default new instructorDataService();