#!/usr/bin/python

import sys
import os
import shutil
import json

def help(command = None):
	print "lePres"
	print "		add		add a page to your presentation"
	print "		del		del a page of your presentation"

def jsonAddPage(pagename):
	fp = open('order.json','r+')
	jsonOrder = fp.read()
	jsonObject =  json.loads(jsonOrder)
	string2append = {u'page':pagename}
	
	jsonObject.append(string2append)
	fp.seek(0)
	fp.write(json.dumps(jsonObject))


def jsonDelPage(pagename):
	fp = open('order.json' ,'r+')
	jsonOrder = fp.read()
	jsonObject = json.loads(jsonOrder)
	newObject = []
	for page in jsonObject:
		if page[u'page'] != pagename:
			newObject.append({u'page': page[u'page']})
	
	fp.seek(0)
	fp.truncate()
	fp.write(json.dumps(newObject))


def delPage(pagename):
	shutil.rmtree(pagename)
	jsonDelPage(pagename)

def addPage(pagename):
	template = open('templates/main.tpl','r')
	templatecontent = template.read()
	slug = pagename.strip()
	newpage = templatecontent.replace("##PAGENAME" , pagename)
	newpage = newpage.replace("PAGENAMECSS" , slug + ".css")
	os.mkdir(slug)
	newFilepointer = open(slug + "/" + slug + ".html" , "w")
	newFilepointer.write(newpage)

	newFilepointer = open(slug + "/" + slug + ".css" , "w")
	newFilepointer.write("/* STYLESHEET FOR " + slug + ".html */")

	newFilepointer.close()

	jsonAddPage(slug)
	print
	print "Added page " + pagename + "in folder "+ slug

if len(sys.argv) < 2:
	help();

else:

	if sys.argv[1] == "add":
		if len(sys.argv) >2:
			addPage(sys.argv[2])
		else:
			print "ERROR: You need to specify a name for the next slide"
			print "lePres add pagename"

	elif sys.argv[1] == "del":
		if len(sys.argv) > 2:
			delPage(sys.argv[2])
		else:
			print "ERROR: You need to specify a name to be removed from your slide"
			print "lePres del pagename"

	else:
		print "Unrecognized command"
		help()


