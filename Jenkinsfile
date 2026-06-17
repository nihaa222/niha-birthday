pipeline {
    agent any

    stages {
        stage('Create Env Files') {
            steps {
                withCredentials([
                    string(credentialsId: 'backend-env', variable: 'BACKEND_ENV'),
                    string(credentialsId: 'frontend-env', variable: 'FRONTEND_ENV')
                ]) {
                    sh 'echo "$BACKEND_ENV" > backend/.env'
                    sh 'echo "$FRONTEND_ENV" > frontend/.env'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d --build'
            }
        }
    }
}