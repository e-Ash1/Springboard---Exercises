def weekday_name(day_of_week):
    """Return name of weekday.
    
        >>> weekday_name(1)
        'Sunday'
        
        >>> weekday_name(7)
        'Saturday'
        
    For days not between 1 and 7, return None
    
        >>> weekday_name(9)
        >>> weekday_name(0)
    """
    week_day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    if 1 <= day_of_week <= 7:
        return week_day[day_of_week -1]
    return None
    
    
    
weekday_name(1)
    

weekday_name(7)

 
weekday_name(9)


weekday_name(0)
     