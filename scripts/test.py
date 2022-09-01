import httpx
import asyncio
import timeit
 

headers = {"user-agent":'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 OPR/26.0.1656.60',}

counts = 0
async def req(client, i):
    global counts
    try:
        res = await client.get('https://ai.ls4ever.love/',timeout=1)
        counts += 1
        # print(counts, res.status_code)
    except :
        return

async def maketasts(fuck_times:int):
    async with httpx.AsyncClient(verify=False,timeout=None,
                              limits=httpx.Limits(max_connections=100, 
                            max_keepalive_connections=20)) as client:
        task_list = []  # save tasks
        _header = {
            "User-Agent": "Mozilla/5.0 (M1 Mac OS X 12) Safari/666.66"
        }
        client.headers.update(_header)
        for i in range(fuck_times):
            res = req(client, i)
            task = asyncio.create_task(res)  # creat
            task_list.append(task)
        await asyncio.gather(*task_list)  # gather tasks
        
def start_asyn():
    fuck_times = 10
    asyncio.run(maketasts(fuck_times))

start_asyn()

# print(timeit.timeit(start_asyn,number=10))
print(timeit.repeat(start_asyn,number=1,repeat=3))