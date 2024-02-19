import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);


    export default function MyDonut(props) {
        const data ={
            labels: ['Happy', 'Neutral' ,'Sad' , 'Cry'],
            datasets: [{
                label: 'Frequence',
                data: [props.data['happy'],props.data['neutral'],props.data['sad'],props.data['cry']],
                backgroundColor: [
                    '#023e8a',
                    '#3B82F6',
                    '#adb5bd',
                    '#e63946'
                  ],
                  hoverOffset: 4,
            }]

        }
        const options = {
                
        }
      return (
        <div className='flex justify-center w-full h-80'>
            <Doughnut 
             data = {data}
             options={options}
            />
        </div>
      )
    }
    