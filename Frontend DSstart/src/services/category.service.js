import http from "../http-common";


class SmjerDataService{

    async get(){
        return await http.get('/Smjer');
    }

    async getBySifra(sifra) {
        return await http.get('/smjer/' + sifra);
      }

    async delete(sifra){
        const odgovor = await http.delete('/Smjer/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(smjer){
        //console.log(smjer);
        const odgovor = await http.post('/smjer',smjer)
           .then(response => {
             return {ok:true, poruka: 'Unio smjer'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(sifra,smjer){
        //console.log(smjer);
        const odgovor = await http.put('/smjer/' + sifra,smjer)
           .then(response => {
             return {ok:true, poruka: 'Promjenio smjer'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
         }

}

export default new SmjerDataService();