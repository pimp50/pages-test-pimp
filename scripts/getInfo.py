#!/usr/bin/env python
# -*- encoding: utf-8 -*-
# @File      :   getInfo.py
# @Time      :   2022/09/01 15:58:26
# @Author    :   yupi
# @Software  :   Notepad++
import requests

headers = {"user-agent":'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 OPR/26.0.1656.60',}
url = "https://ai.ls4ever.love/"
res = requests.get(url,headers=headers)
# print(res.text)
import re
imgs = re.findall(r'https://.*?"',res.text)
print(imgs)


