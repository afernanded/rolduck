import React from 'react'

const Icons = ({setContent, content, theme}) => {
    const reactions = [
        'đ','đŖ','đŠ','đ','đ','đĢ','đ','đ','đ','đ¤','đ','đ',
        'đ¤Ŗ','đ¤','đ ','đ','đĄ','đļ','đ','đ','đ¤','đ','đ','đ',
        'đ','đ¯','đ','đ','đ˛','đ§','đ','đ','đ¨','đ°','đ¤','đŗ',
        'đą','đĒ','đ','đ','đ´','đŦ','đ','đ','đ¤Ĩ','đ¤§','đ','đ',
        'đ¤','đˇ','đ','đ¤¤','đ¤','đĩ','đ¤','đ','đ¤ĸ','đ¤ ','đ¤','đ',
        'đ¤Ą','đŋ','đ','âšī¸','đš','đē','đ','đ','đģ','đ','đ','đ',
        'đĸ','đ­','đ','đŠ','đ','đ','âī¸','đ¤','đ','đ¤','đ¤','đ','âī¸',
        'đ','đ','đ', 'đ','đ','â','đ¤','đ¤','đĒ','đ','đ¤','đ',
        'đ','â','đī¸','đ','đ','â¤ī¸','đ','đ','đ',
   ]
    return (
            <div className="nav-item dropdown"
            style={{ opacity: 1, filter: theme ? 'invert(1)' : 'invert(0)'}} >
                <span
                    className="nav-link position-relative px-1"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                        
                        <span style={{opacity: 0.4}}>đ</span>


                </span>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <div className="reactions">
                        {
                            reactions.map(icon => (
                                <span key={icon} onClick={() => setContent(content + icon)}>
                                    {icon}
                                </span>
                            ))
                        }
                    </div>
                </div>
        </div>
    )
}

export default Icons
