import React from 'react'
import SearchTag from './SearchTag'
import { MEETING_DAYS, SEARCH_SUBJECTS } from '../constants'
import _ from 'lodash'

const SearchTags = (props) => {
  const generateQueryTag = () => {
    if (props.q) {
      const onDelete = (value) => { props.updateQueryParams({ q: null }) }

      return [<span key='queryTagIntro'>the search query</span>, <SearchTag key='queryTag-0' value={props.q} onDelete={onDelete} />];
    }
  }

  const generateTeamNameTag = () => {
    if (props.teamName) {
      const onDelete = (value) => { props.updateQueryParams({ teamName: null, team_id: null }) }
      const humanReadableName = decodeURIComponent(props.teamName);

      return [<span key='queryTagIntro'>organized by</span>, <SearchTag key='queryTag-0' value={humanReadableName} onDelete={onDelete} />];
    }
  }

  const generateTopicsTags = () => {
    if (props.topics && props.topics.length > 0) {
      const onDelete = (value) => {
        const newTopicsArray =  _.without(props.topics, value);
        const topics = newTopicsArray.length > 0 ? newTopicsArray : null
        props.updateQueryParams({ topics })
      }

      const introPhrase = props.topics.length === 1 ? 'the topic' : 'the topics';
      let topicsTagsArray = [<span key='topicTagIntro'>{introPhrase}</span>]

      props.topics.map((item, index) => {
        if (props.topics.length > 1 && index === (props.topics.length - 1)) {
          topicsTagsArray.push(<span key={`topicTag-${index + 2}`}>or</span>)
        }

        topicsTagsArray.push(<SearchTag value={item} key={`topicTag-${index}`} onDelete={onDelete} />)
      })

      return topicsTagsArray;
    }
  }

  const generateLocationTag = () => {
    if (props.latitude && props.longitude) {
      const text = `Within ${props.distance}km of your location`;
      const onDelete = (value) => {
        props.updateQueryParams({ latitude: null, longitude: null, distance: 50, useLocation: false })
      }
      return [<span key='locationTagIntro'>located</span>, <SearchTag key='locationTag-0' value={text} onDelete={onDelete} />];
    } else if (props.city) {
      const onDelete = (value) => {
        props.updateQueryParams({ city: null })
      }
      return [<span key='locationTagIntro'>located in</span>, <SearchTag key='locationTag-0' value={props.city} onDelete={onDelete} />];
    }
  }

  const generateMeetingDaysTags = () => {
    if (props.weekdays && props.weekdays.length > 0) {
      const onDelete = (day) => {
        const dayIndex = MEETING_DAYS.indexOf(day);
        const newWeekdayArray = _.without(props.weekdays, dayIndex);
        const weekdays = newWeekdayArray.length > 0 ? newWeekdayArray : null;
        props.updateQueryParams({ weekdays })
      }

      let weekdayTagsArray = [<span key='weekdayTagIntro'>meeting on</span>]

      props.weekdays.map((dayIndex, index) => {
        const weekdayName = MEETING_DAYS[dayIndex];

        if (props.weekdays.length > 1 && index === props.weekdays.length - 1) {
          weekdayTagsArray.push(<span key={`weekdayTag-${index + 2}`}>or</span>)
        }

        weekdayTagsArray.push(<SearchTag value={weekdayName} key={`weekdatTag-${index}`} onDelete={onDelete} />)
      })

      return weekdayTagsArray;
    }
  }

  const generateTagsPhrase = (tag) => {
    switch (tag) {
      case 'q':
      return generateQueryTag();
      case 'topics':
      return generateTopicsTags();
      case 'location':
      return generateLocationTag();
      case 'meetingDays':
      return generateMeetingDaysTags();
      case 'teamName':
      return generateTeamNameTag();
    }
  }

  const generateSearchSummary = () => {
    const results = props.data.length === 1 ? 'result' : 'results';
    const forSearchSubject = <span key='resultsSummary-1'>for {SEARCH_SUBJECTS[props.searchSubject]}</span>;
    const withSpan = <span key='resultsSummary-2'>with</span>;
    const tagsToDisplay = ['q', 'topics', 'location', 'meetingDays', 'teamName'];

    let searchSummaryItems = [<span key='resultsSummary-0'>Showing {props.data.length} {results}</span>];

    tagsToDisplay.map((tag) => {
      const tagsArray = generateTagsPhrase(tag);

      if (!!tagsArray) {
        if (searchSummaryItems.length === 1) {
          searchSummaryItems.push(forSearchSubject)
          if (tag === 'q' || tag === 'topics') {
            searchSummaryItems.push(withSpan)
          }
        } else {
          searchSummaryItems.push(<span key={`resultsSummary-${searchSummaryItems.length}`}>and</span>)
        }
        searchSummaryItems.push(tagsArray)
      }
    })

    return searchSummaryItems;
  }

  return(
    <div className='results-summary'>
      <div className='search-tags wrapper'>
        {generateSearchSummary()}
      </div>
    </div>
  )
}

export default SearchTags;