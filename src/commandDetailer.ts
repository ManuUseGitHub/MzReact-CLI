export const detailCommand = (argv : string[]) => {
    
    const m = /^f?(?<action>[gr])f?(?<first>.)(?<second>.?)/.exec(argv[2])
    if(m && m.groups!.second){
        argv[2] = `-${m.groups!.action}${m.groups!.first}`
        argv[3] = `AMBIGUOUS-${m.groups!.first.toUpperCase()}`
        argv[4] = `-${m.groups!.second}`
        argv[5] = `AMBIGUOUS-${m.groups!.second.toUpperCase()}`
    }   
}