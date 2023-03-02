import React, { memo } from 'react'
import { Text, Group } from '@mantine/core'

export const CommentsList = memo(({ commentsList, getUsername }) => (
    <>
        {commentsList.map((comment) => {
            return (
                <Group key={comment.id}>
                    <Text
                        weight={500}
                        color='white'
                        size='lg'
                    >
                        {getUsername(comment.user)}
                    </Text>
                    <Text
                        color='white'
                        weight={'lighter'}
                    >
                        {comment.comment}
                    </Text>
                </Group>
            )
        })}
    </>
))
