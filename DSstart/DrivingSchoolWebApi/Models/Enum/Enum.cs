using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace DrivingSchoolWebApi.Models.Enum
{
    public class Enum
    {
        enum Status
        {
            Withdraw=-1,              //-1
            ListeningTR=0,            //0
            WaitingTRTest=1,          //1
            LiFirstAid=2,             //2
            WaFirstAidTest=3,         //3
            WaDrivingLessons=4,       //4
            Driving=5,                //5
            WaDrivingLessonsTest=6,   //6
            WaHAK=7,                  //7
            PassedAll=8               //8
        }
        
    }
}
