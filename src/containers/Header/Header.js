import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Header.module.css'
import {connect} from "react-redux";
class Header extends React.Component{

    createLinks = (links) =>{
       return links.map( (link, index) => {
            return(
                <div key={index} className={styles.navigation_item}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={styles.navigation_item_a}
                        className={styles.navigation_item_a}
                    >
                        {link.label}
                    </NavLink>
                </div>
            )
        })
    }

    render(){

        let links = [
            {id : 1, to : '/', label : 'Главная', exact : true},
            {id : 2, to : '/', label : 'Список тестов', exact : true}
        ]

        if(this.props.isAuth){
            links.push(
                {id : 3, to : '/quiz-maker', label : 'Создание нового теста', exact : true},
                {id : 4, to : '/exit', label : 'Выход', exact : true},
            )
        }
        else{
            links.push(
                {id : 3, to : '/auth', label : 'Авторизация', exact : true},
            )
        }

        return(
            <header className='header'>
                <nav className={styles.main_nav}>
                    {this.createLinks(links)}
                </nav>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return{
        isAuth : !!state.auth.token
    }
}

export default connect(mapStateToProps, null)(Header)