import axios from "axios";
import transformData from "./transromData";
import {v4 as uuidv4} from "uuid";
import {_Data} from "../interfaces/DataBoard";
import {getColumnById, getColumnFromBackend} from "./columnService";
import {moveCardInColumn, moveCardToAnotherColumn} from "./cardService";
import DataFromBackend from "../interfaces/DataFromBackend";

export const domainUrl = 'https://billenium-project-uwm-production-b520.up.railway.app'
export const usersData = [
    {
        id:'123',
        name:'Piotrek'
    },
    {
        id:'321',
        name:'Krzyś'
    },
    {
        id:'213',
        name:'Jurek'
    }
]



function withPositionInRange(lowerBound: number, upperBound: number, columns:_Data["data"]['columnList']){
    const x = Object.values(columns).filter((column) => {
        return column.position >= lowerBound && column.position <= upperBound;
    });
    return x;
}

function changePositionToRight(columns:DataFromBackend['columnList']){
    return Object.values(columns).map((column) => {
        column.position = column.position + 1
    });
}
function changePositionToLeft(columns:DataFromBackend['columnList']){
    return Object.values(columns).map((column) => {
        column.position = column.position - 1
    });
}
export const onDragEnd = (result: any, columns:_Data["data"]['columnList'], setData:_Data["setData"], data:_Data["data"]) => {
    if (!result.destination) return
    const {source, destination} = result;
    if(result.type === 'column') {
        if(destination.index < columns[result.draggableId].position){
            const columnsToChange = withPositionInRange(destination.index, source.index, columns);
            console.log(columnsToChange)
            const changedColumns = changePositionToRight(columnsToChange)

        }if(destination.index > columns[result.draggableId].position){
            const columnsToChange = withPositionInRange(source.index, destination.index, columns);
            const changedColumns = changePositionToLeft(columnsToChange)
        }
        columns[result.draggableId].position = destination.index
        moveColumnToBackend(result.draggableId, destination.index)
            .then(res => {
                getColumnFromBackend(data.id)
                    .then(res => {
                        if (res) {
                            const columns: _Data["data"]['columnList'] = res
                            setData({
                                ...data,
                                columnList: columns

                            })
                        }
                    })
            })
    }
    if(result.type === 'task') {
        if (source.droppableId !== destination.droppableId){
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.cards];
            const destItems = [...destColumn.cards];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setData({
                ...data,
                columnList: {
                    ...columns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        cards: sourceItems
                    },
                    [destination.droppableId]:{
                        ...destColumn,
                        cards: destItems
                    }
                }
            })
            moveCardToAnotherColumn(result.draggableId, destination.droppableId, destination.index)
                .then(res => {
                    getColumnFromBackend(data.id)
                        .then(res => {
                            if (res) {
                                setData({
                                    ...data,
                                    columnList: {
                                        ...res,
                                        [source.droppableId]: {
                                            ...res[source.droppableId],
                                            cards: res[source.droppableId].cards
                                        },
                                        [destination.droppableId]:{
                                            ...res[destination.droppableId],
                                            cards: res[destination.droppableId].cards
                                        }
                                    }

                                })
                            }
                        })
                })
        }else{
            const column = columns[source.droppableId];
            const copiedItems = [...column.cards];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setData({
                ...data,
                columnList: {
                    ...columns,
                    [source.droppableId]: {
                        ...column,
                        cards: copiedItems
                    }
                }})

            moveCardInColumn(result.draggableId, destination.index)
                .then(res => {
                    getColumnById(result.draggableId)
                        .then(res => {
                            if (res) {
                                setData({
                                    ...data,
                                    columnList: {
                                        ...columns,
                                        [res.id]: {
                                            ...column,
                                            cards: copiedItems
                                        }
                                    }})
                            }
                        })
                })
        }
    }
}

export function loadDefaultData(){
    return {
        id: "0",
        title: "Nazwa Tablicy",
        creatorName: "Twórca",
        assignedUsers: [{id: uuidv4(), name: "twórca"}],
        columnList: {
            [uuidv4()]: {
                id: uuidv4(),
                title: "Open",
                cardsLimit: 0,
                position: 0,
                cards: [{id: uuidv4(), title: "Tak", description: "Task description", position:0}],
            },
            [uuidv4()]: {
                id: uuidv4(),
                title: "In progress",
                cardsLimit: 3,
                position: 1,
                cards: [],
            },
            [uuidv4()]: {
                id: uuidv4(),
                title: "Done",
                cardsLimit: 0,
                position: 2,
                cards: [],
            },
        },
    }
}

export async function loadBoardFromBackend(id: string): Promise<_Data["data"]> {
    const apiUrl = domainUrl+`/api/boards/${id}`;
    try {
        const response = await axios.get(apiUrl);
        if(response.data != null){
            return transformData(response.data);
        }
    } catch (error) {
        console.error(error);
        return loadDefaultData();
    }
    return loadDefaultData();
}

export async function moveColumnToBackend(columnId:string, newPosition:number){
    const apiUrl = domainUrl+`/api/columns/move`;
    try {
        const response = await axios.put(apiUrl, {columnId, newPosition});
        console.log(response.data)
    } catch (error) {
        console.error(error);
    }
}

export async function editBoardToBackend(boardId:string, newTitle:string){
    const apiUrl = `http://localhost:8080/api/boards`;
    try {
        const response = await axios.put(apiUrl, {boardId, newTitle});
        console.log(response.data)
    } catch (error) {
        console.error(error);
    }
}

export async function getBoardTitleFromBackend(boardId:string){
    const apiUrl = `http://localhost:8080/api/boards`;
    try {
        const response = await axios.get(apiUrl, {params:{boardId:boardId}});
        return response.data
    } catch (error) {
        console.error(error);
    }
}