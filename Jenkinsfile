pipeline {
    agent any

    stages {
        stage('Deploy to AWS') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'aws-ssh-key', keyFileVariable: 'KEY_FILE', usernameVariable: 'USER')]) {
                    sh '''
                        ssh -i $KEY_FILE -o StrictHostKeyChecking=no $USER@18.184.114.100 "
                            cd devops-practice && 
                            git pull && 
                            docker compose up -d --build
                        "
                    '''
                }
            }
        }
    }
}