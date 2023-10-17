import http from "../http-common";


class vehicleDataService{

    async get(){
        return await http.get('/Vehicle');
    }

    async getByID(ID) {
        return await http.get('/vehicle/' + ID);
      }

    async delete(ID){
        const answer = await http.delete('/Vehicle/' + ID)
        .then(response => {
            return {ok: true, message: 'Succesfully deleted'};
        })
        .catch(e=>{
            return {ok: false, message: e.response.data};
        });

        return answer;
    }


    async post(vehicle){
        //console.log(vehicle);
        const answer = await http.post('/vehicle',vehicle)
           .then(response => {
             return {ok:true, message: 'Vehicle added'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, message: error.response.data}; // return u odgovor
           });
     
           return answer;
    }

    async put(ID,vehicle){
        //console.log(vehicle);
        const answer = await http.put('/vehicle/' + ID,vehicle)
           .then(response => {
             return {ok:true, message: 'Vehicle changed'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, message: error.response.data}; // return u odgovor
           });
     
           return answer;
         }

}

export default new vehicleDataService();