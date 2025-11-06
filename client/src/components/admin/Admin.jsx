import React from 'react'
import AdminComments from './admin-comments/AdminComments';
import styles from '../admin/Admin.module.css'

export default class Admin extends React.Component {

    componentDidMount(){
        console.log('On Component Mount')
    }

    render() {
        return (
        <>
        <section className={styles['admin-section']}>
            <h1>Admin Panel</h1>
            <AdminComments />
        </section>
        </>
    );
    }
}

