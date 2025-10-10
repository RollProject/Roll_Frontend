import React from 'react';
import GridItem from '@/components/commons/GridItem';

// 테스트용 메시지 데이터 (실제 데이터는 백엔드 API에서 가져와야 함)
const DUMMY_MESSAGES = [
    { id: 101, title: '작성자 A', content: "팀장님, 프로젝트 마무리 정말 고생 많으셨어요!\n다음 프로젝트도 잘 부탁드려요.", theme: 'bg-yellow-100', font: 'font-serif' },
    { id: 102, title: '작성자 B', content: "새해 복 많이 받고,\n2026년 대박나세요!", theme: 'bg-blue-100', font: 'font-mono' },
    { id: 103, title: '작성자 C', content: "이거는 내용이 좀 길어도 안 잘리는지 테스트해보기 위해 아주 길게 적는 메시지입니다. 사용자 경험을 위해 최대한 많은 내용을 담아도 메모지에 무리 없이 표시되어야 합니다.", theme: 'bg-green-100', font: 'font-sans' },{ id: 101, title: '작성자 A', content: "팀장님, 프로젝트 마무리 정말 고생 많으셨어요!\n다음 프로젝트도 잘 부탁드려요.", theme: 'bg-yellow-100', font: 'font-serif' },
    { id: 102, title: '작성자 B', content: "새해 복 많이 받고,\n2026년 대박나세요!", theme: 'bg-blue-100', font: 'font-mono' },
    { id: 103, title: '작성자 C', content: "이거는 내용이 좀 길어도 안 잘리는지 테스트해보기 위해 아주 길게 적는 메시지입니다. 사용자 경험을 위해 최대한 많은 내용을 담아도 메모지에 무리 없이 표시되어야 합니다.", theme: 'bg-green-100', font: 'font-sans' },{ id: 101, title: '작성자 A', content: "팀장님, 프로젝트 마무리 정말 고생 많으셨어요!\n다음 프로젝트도 잘 부탁드려요.", theme: 'bg-yellow-100', font: 'font-serif' },
    { id: 102, title: '작성자 B', content: "새해 복 많이 받고,\n2026년 대박나세요!", theme: 'bg-blue-100', font: 'font-mono' },
    { id: 103, title: '작성자 C', content: "이거는 내용이 좀 길어도 안 잘리는지 테스트해보기 위해 아주 길게 적는 메시지입니다. 사용자 경험을 위해 최대한 많은 내용을 담아도 메모지에 무리 없이 표시되어야 합니다.", theme: 'bg-green-100', font: 'font-sans' },{ id: 101, title: '작성자 A', content: "팀장님, 프로젝트 마무리 정말 고생 많으셨어요!\n다음 프로젝트도 잘 부탁드려요.", theme: 'bg-yellow-100', font: 'font-serif' },
    { id: 102, title: '작성자 B', content: "새해 복 많이 받고,\n2026년 대박나세요!", theme: 'bg-blue-100', font: 'font-mono' },
    { id: 103, title: '작성자 C', content: "이거는 내용이 좀 길어도 안 잘리는지 테스트해보기 위해 아주 길게 적는 메시지입니다. 사용자 경험을 위해 최대한 많은 내용을 담아도 메모지에 무리 없이 표시되어야 합니다.", theme: 'bg-green-100', font: 'font-sans' },{ id: 101, title: '작성자 A', content: "팀장님, 프로젝트 마무리 정말 고생 많으셨어요!\n다음 프로젝트도 잘 부탁드려요.", theme: 'bg-yellow-100', font: 'font-serif' },
    { id: 102, title: '작성자 B', content: "새해 복 많이 받고,\n2026년 대박나세요!", theme: 'bg-blue-100', font: 'font-mono' },
    { id: 103, title: '작성자 C', content: "이거는 내용이 좀 길어도 안 잘리는지 테스트해보기 위해 아주 길게 적는 메시지입니다. 사용자 경험을 위해 최대한 많은 내용을 담아도 메모지에 무리 없이 표시되어야 합니다.", theme: 'bg-green-100', font: 'font-sans' },{ id: 101, title: '작성자 A', content: "팀장님, 프로젝트 마무리 정말 고생 많으셨어요!\n다음 프로젝트도 잘 부탁드려요.", theme: 'bg-yellow-100', font: 'font-serif' },
    { id: 102, title: '작성자 B', content: "새해 복 많이 받고,\n2026년 대박나세요!", theme: 'bg-blue-100', font: 'font-mono' },
    { id: 103, title: '작성자 C', content: "이거는 내용이 좀 길어도 안 잘리는지 테스트해보기 위해 아주 길게 적는 메시지입니다. 사용자 경험을 위해 최대한 많은 내용을 담아도 메모지에 무리 없이 표시되어야 합니다.", theme: 'bg-green-100', font: 'font-sans' },{ id: 101, title: '작성자 A', content: "팀장님, 프로젝트 마무리 정말 고생 많으셨어요!\n다음 프로젝트도 잘 부탁드려요.", theme: 'bg-yellow-100', font: 'font-serif' },
    { id: 102, title: '작성자 B', content: "새해 복 많이 받고,\n2026년 대박나세요!", theme: 'bg-blue-100', font: 'font-mono' },
    { id: 103, title: '작성자 C', content: "이거는 내용이 좀 길어도 안 잘리는지 테스트해보기 위해 아주 길게 적는 메시지입니다. 사용자 경험을 위해 최대한 많은 내용을 담아도 메모지에 무리 없이 표시되어야 합니다.", theme: 'bg-green-100', font: 'font-sans' },
];


function TestFullMsgBoard() {
    
    const paperTitle = "팀 회식 기념 롤링페이퍼"; 

    return (
        <div className="p-4 pt-16 min-h-screen bg-gray-50">
            
            <h1 className="text-xl font-bold mb-4 text-center">{paperTitle} - 상세 메시지 목록</h1>
            <div className="flex justify-center"> 
            {/*  그리드 레이아웃: 가로 3개, 세로 제한 없음  */}
            <div className="grid grid-cols-3 gap-4 w-fit"> 

                {DUMMY_MESSAGES.map(message => (
                    <GridItem
                        key={message.id}
                        title={message.title}
                        content={message.content}
                        fontStyle={message.font}
                        themeStyle={message.theme}
                        isFullView={true} // 상세 메시지 뷰 활성화
                        onClick={() => console.log(`${message.title}의 메시지 상세 클릭`)}
                    />
                ))}
            </div>
            </div>
            {/* 무한 스크롤 테스트를 위한 여백 */}
            <div className="h-48"></div>
        </div>
    );
}

export default TestFullMsgBoard;