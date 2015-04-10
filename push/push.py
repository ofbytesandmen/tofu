##
#
#	TOFU Push
#	Use at own risk.
#
#
#	(C) golddiamonds
#	licensed under the MIT license	
#
##

from subprocess import check_output

#load config.txt
f_config = open("config.txt", "r")

#load files.txt
f_files = open("files.txt", "r")

for line in f_config:
	#get password
	if "password=" in line:
		password = line[9:].replace('\n','').replace('\r','')
		print password
	if "connect_string=" in line:
		connect_string = line[15:].replace('\n','').replace('\r','')
		print connect_string

push_files = []
for line in f_files:
	print line
	push_files.append(line.replace('\n','').replace('\r',''))

print push_files

for push_file in push_files:
	push_cmd = "pscp -pw " + password + " ..\\" + push_file + " " + connect_string
	print push_cmd
	print check_output(push_cmd, shell=True)