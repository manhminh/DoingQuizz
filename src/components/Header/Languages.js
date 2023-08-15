import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from 'react-i18next';

const Languages = (props) => {
    const { t, i18n } = useTranslation();
    const handleChangleLanguages = (language) => {
        i18n.changeLanguage(language)
    }

    const getTitleLanguages = (language) => {
        switch (language) {
            case "vi":
                return "Vietnamese";
            case "en":
                return "English";
        }
    }
    return (
        <>
            <NavDropdown className='languages' title={getTitleLanguages(i18n.language)} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleChangleLanguages('vi')}>Vietnamese</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangleLanguages('en')}>English</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default Languages