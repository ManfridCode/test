import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {useSelector} from "react-redux"
import MROThelper from './MROThelper'
import './SalaryForm.scss'

interface Props {}

enum SALARY {
    MOUNT = 'salaryPerMount',
    MROT  = 'salaryMrot',
    DAY   = 'salaryPerDay',
    HOUR  = 'salaryPerHour'
}

const SalaryForm:React.FC<Props & InjectedFormProps<{}, Props>> = props=>{

    const formatNumber = (summ:number)=>!summ?'':summ.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");

    const {ndfl,salaryType,summ} = useSelector((state:any) => state.form.salary.values);

    const _summ = parseInt(summ.replace(/[^0-9]/ig,''));
    const ndflSumm = Math.round(ndfl?_summ*0.13:_summ*0.13/(1-0.13));
    const handSumm = ndfl?_summ-ndflSumm:_summ;
    const resultSumm = ndfl?_summ:_summ+ndflSumm;
    return (
        <form className="salaryForm">
            <h6>Сумма</h6>
            <div className="salaryForm__radio">
                <Field id="pmonth" value={SALARY.MOUNT} name="salaryType" component="input" type="radio"></Field>
                <label htmlFor="pmonth">Оклад за месяц</label>
            </div>
             <div className="salaryForm__radio">
                 <Field id="mrot" value={SALARY.MROT} name="salaryType" component="input" type="radio" />
                 <label htmlFor="mrot">МРОТ</label>
                 <MROThelper/>
             </div>
             <div className="salaryForm__radio">
                 <Field id="pday" value={SALARY.DAY} name="salaryType" component="input" type="radio" />
                 <label htmlFor="pday">Оплата за день</label>
             </div>
             <div className="salaryForm__radio">
                 <Field id="phour" value={SALARY.HOUR} name="salaryType" component="input" type="radio" />
                 <label htmlFor="perhour">Оплата за день</label>
             </div>
            <div className="ndfl-block">
                <span className={ndfl?'active':''}>Указать с НДФЛ</span>
                <Field id="ndfl" name="ndfl" component="input" type="checkbox" />
                <label htmlFor="ndfl"></label>
                <span className={!ndfl?'active':''}>Без НДФЛ</span>
            </div>
            <div className="summ-block">
                <Field
                    name="summ"
                    component='input'
                    type="text"
                    normalize={(val:string,prev:string)=>{
                        if(/^[0-9\s]*$/ig.test(val)) return val;
                        else return prev;
                    }}
                    format={(val:string,name:string)=>{
                        const _val = val.replace(/[^0-9]/ig,'');
                        return formatNumber(parseInt(_val))
                    }}
                /><span>&#8381;</span>
            </div>
            {salaryType === SALARY.MOUNT &&
                <div className="salaryForm__plate">
                    <div><strong>{formatNumber(handSumm)} &#8381;</strong> сотрудник будет получать на руки</div>
                    <div><strong>{formatNumber(ndflSumm)} &#8381;</strong><b> НДФЛ, 13%</b> от оклада</div>
                    <div><strong>{formatNumber(resultSumm)} &#8381;</strong> за сотрудника в месяц</div>
                </div>
            }
        </form>
        
    )
};


export default reduxForm<{}, Props>({
    initialValues:{
        salaryType: SALARY.MOUNT,
        ndfl: false,
        summ:''
    },
    form: 'salary'
})(SalaryForm);
