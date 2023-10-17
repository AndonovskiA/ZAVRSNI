import http from "../http-common";


class categoryDataService{

    async get(){
        return await http.get('/Category');
    }

    async getByID(ID) {
        return await http.get('/category/' + ID);
      }

    async delete(ID){
        const answer = await http.delete('/Category/' + ID)
        .then(response => {
            return {ok: true, message: 'succesfully deleted category'};
        })
        .catch(e=>{
            return {ok: false, message: e.response.data};
        });

        return answer;
    }


    async post(category){
        //console.log(smjer);
        const answer = await http.post('/category',category)
           .then(response => {
             return {ok:true, message: 'Category added'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, message: error.response.data}; // return u odgovor
           });
     
           return answer;
    }

    async put(iD,category){
        //console.log(smjer);
        const answer = await http.put('/category/' + ID,category)
           .then(response => {
             return {ok:true, message: 'Category changed'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, message: error.response.data}; // return u odgovor
           });
     
           return answer;
         }

}

export default new categoryDataService();