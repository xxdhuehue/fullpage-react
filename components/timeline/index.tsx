import HorizontalTimeline from 'react-horizontal-timeline';

/*
Format: YYYY-MM-DD
Note: Make sure dates are sorted in increasing order
*/
const VALUES = [
    '2008-06-01',
    '2010-06-01',
    '2013-06-01',
    '2015-03-01',
    '2019-01-01',
    '2019-06-17',
    '2019-08-01',
];

const Timeline = () => {
    return (
        <div> 
        <div style={{ width: '60%', height: '100px', margin: '0 auto' }}>
          <HorizontalTimeline
            index={0}
            // indexClick={(index) => {
            //   this.setState({ value: index, previous: 0 });
            // }}
            values={ VALUES } />
        </div>
        <div className='text-center'>
          {/* {this.state.value} */}
        </div>
      </div>
    )
}

export default Timeline;
